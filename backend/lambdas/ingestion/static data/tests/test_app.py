import sys
import os
from decimal import Decimal
from unittest.mock import Mock, MagicMock, patch

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import transform_item, save_to_dynamodb, lambda_handler

def test_transform_rocket_data():
    raw_rocket = {
        "id": "falcon9",
        "name": "Falcon 9",
        "type": "rocket",
        "active": True,
        "cost_per_launch": 50000000,
        "success_rate_pct": 98,
        "flickr_images": ["img1.jpg", "img2.jpg"],
        "description": "Cohete reutilizable",
        "height": {"meters": 70},
        "diameter": {"meters": 3.7},
        "mass": {"kg": 549054},
        "engines": {"type": "merlin"},
        "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9"
    }

    expected_output = {
        "id": "falcon9",
        "name": "Falcon 9",
        "type": "rocket",
        "active": True,
        "cost_per_launch": Decimal("50000000"),
        "success_rate_pct": Decimal("98"),
        "flickr_images": ["img1.jpg", "img2.jpg"],
        "description": "Cohete reutilizable",
        "height_m": Decimal("70"),
        "diameter_m": Decimal("3.7"),
        "mass_kg": Decimal("549054"),
        "engines_type": "merlin",
        "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9"
    }

    assert transform_item(raw_rocket, "rockets") == expected_output

def test_transform_launchpad_data():
    raw_launchpad = {
        "id": "ksc_lc39a",
        "name": "KSC LC 39A",
        "full_name": "Kennedy Space Center",
        "locality": "Cape Canaveral",
        "region": "Florida",
        "latitude": 28.6080585,
        "longitude": -80.6039558,
        "launch_attempts": 15,
        "launch_successes": 14,
        "images": {"large": ["https://imgur.com/1jwU0Pk.png"]},
        "status": "active",
        "details": "Historic launch site"
    }

    expected_output = {
        "id": "ksc_lc39a",
        "name": "KSC LC 39A",
        "full_name": "Kennedy Space Center",
        "locality": "Cape Canaveral",
        "region": "Florida",
        "latitude": Decimal("28.6080585"),
        "longitude": Decimal("-80.6039558"),
        "launch_attempts": 15,
        "launch_successes": 14,
        "images": ["https://imgur.com/1jwU0Pk.png"],
        "status": "active",
        "details": "Historic launch site"
    }

    assert transform_item(raw_launchpad, "launchpads") == expected_output

def test_save_to_dynamodb_updates_items():
    mock_table = MagicMock()
    mock_dynamo = MagicMock()
    mock_dynamo.Table.return_value = mock_table

    test_data = [
        {"id": "1", "name": "Falcon 9", "height_m": 70},
        {"id": "2", "name": "Starship", "height_m": 118}
    ]

    with patch("app.boto3.resource", return_value=mock_dynamo):
        save_to_dynamodb(test_data, "SpaceXRockets")

        assert mock_table.update_item.call_count == 2

        first_call_args = mock_table.update_item.call_args_list[0][1]
        assert first_call_args["Key"] == {"id": "1"}
        assert "SET #name = :name, #height_m = :height_m" in first_call_args["UpdateExpression"]
        assert first_call_args["ExpressionAttributeValues"][":name"] == "Falcon 9"
        assert first_call_args["ExpressionAttributeValues"][":height_m"] == 70

@patch('app.requests.get')
@patch('app.boto3.resource')
def test_lambda_handler_rockets(mock_dynamo, mock_get):
    mock_response = Mock()
    mock_response.json.return_value = [{
        "id": "falcon9",
        "name": "Falcon 9",
        "type": "rocket",
        "active": True,
        "cost_per_launch": 50000000,
        "success_rate_pct": 98,
        "flickr_images": ["img1.jpg", "img2.jpg"],
        "description": "Cohete reutilizable",
        "height": {"meters": 70},
        "diameter": {"meters": 3.7},
        "mass": {"kg": 549054},
        "engines": {"type": "merlin"},
        "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9"
    }]
    mock_get.return_value = mock_response

    mock_table = MagicMock()
    mock_dynamo.return_value.Table.return_value = mock_table

    event = {"entity": "rockets"}
    result = lambda_handler(event, None)

    assert result["statusCode"] == 200
    assert "1 rockets actualizados" in result["body"]
    mock_table.update_item.assert_called_once()

@patch('app.requests.get')
@patch('app.boto3.resource')
def test_lambda_handler_launchpads(mock_dynamo, mock_get):
    mock_response = Mock()
    mock_response.json.return_value = [{
        "id": "ksc_lc39a",
        "name": "KSC LC 39A",
        "full_name": "Kennedy Space Center",
        "locality": "Cape Canaveral",
        "region": "Florida",
        "latitude": 28.6080585,
        "longitude": -80.6039558,
        "launch_attempts": 15,
        "launch_successes": 14,
        "images": {"large": ["https://imgur.com/1jwU0Pk.png"]},
        "status": "active",
        "details": "Historic launch site"
    }]
    mock_get.return_value = mock_response

    mock_table = MagicMock()
    mock_dynamo.return_value.Table.return_value = mock_table

    event = {"entity": "launchpads"}
    result = lambda_handler(event, None)

    assert result["statusCode"] == 200
    assert "1 launchpads actualizados" in result["body"]
    mock_table.update_item.assert_called_once()

def test_lambda_handler_invalid_entity():
    event = {"entity": "invalid"}
    result = lambda_handler(event, None)
    assert result["statusCode"] == 500
    assert "invalid" in result["body"]

@patch('app.requests.get')
def test_lambda_handler_api_error(mock_get):
    mock_get.side_effect = Exception("API no disponible")
    event = {"entity": "rockets"}
    result = lambda_handler(event, None)
    assert result["statusCode"] == 500
    assert "API no disponible" in result["body"]
