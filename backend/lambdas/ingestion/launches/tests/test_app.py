import sys
import os
from unittest.mock import Mock, MagicMock, patch

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import transform_launch_data, fetch_launch_data, save_to_dynamodb, lambda_handler

def test_transform_successful_launch():
    raw_launch = {
        "id": "abc123",
        "name": "Test Launch",
        "upcoming": False,
        "success": True,
        "date_utc": "2023-01-01T00:00:00Z",
        "rocket": "falcon9",
        "launchpad": "ksc_lc39a"
    }

    transformed = transform_launch_data(raw_launch)

    assert transformed == {
        "id": "abc123",
        "mission_name": "Test Launch",
        "status": "success",
        "date_utc": "2023-01-01T00:00:00Z",
        "rocket_id": "falcon9",
        "launchpad_id": "ksc_lc39a",
        "details": ""
    }

def test_fetch_launch_data_success():
    mock_response = Mock()
    mock_response.json.return_value = [{"id": "test1"}, {"id": "test2"}]

    with patch('app.requests.get', return_value=mock_response) as mock_get:
        data = fetch_launch_data()
        mock_get.assert_called_once_with("https://api.spacexdata.com/v4/launches")
        assert len(data) == 2
        assert data[0]["id"] == "test1"

def test_save_to_dynamodb():
    mock_table = MagicMock()
    mock_batch_writer = MagicMock()
    mock_table.batch_writer.return_value.__enter__.return_value = mock_batch_writer

    with patch('app.boto3.resource') as mock_dynamo:
        mock_dynamo.return_value.Table.return_value = mock_table

        test_data = [{"launch_id": "1"}, {"launch_id": "2"}]
        save_to_dynamodb(test_data, "SpaceXLaunches")

        mock_dynamo.return_value.Table.assert_called_with("SpaceXLaunches")
        assert mock_batch_writer.put_item.call_count == 2

@patch('app.fetch_launch_data')
@patch('app.transform_launch_data')
@patch('app.save_to_dynamodb')
def test_lambda_handler_success(mock_save, mock_transform, mock_fetch):
    mock_fetch.return_value = [{"id": "test1"}]
    mock_transform.side_effect = lambda x: {"launch_id": x["id"]}

    response = lambda_handler({}, None)

    assert response["statusCode"] == 200
    mock_save.assert_called_once_with([{"launch_id": "test1"}], "SpaceXLaunches")
