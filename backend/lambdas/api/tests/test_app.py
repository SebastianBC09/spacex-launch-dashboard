import sys
import os
import json
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import lambda_handler, handle_launches, handle_launch_by_id, handle_rockets, handle_launchpads

def mock_table_with_items(items):
    mock_table = MagicMock()
    mock_table.scan.return_value = {'Items': items}
    mock_table.get_item.return_value = {'Item': items[0] if items else None}
    return mock_table

def test_handle_launches_success():
    with patch("app.dynamodb") as mock_dynamo:
        mock_dynamo.Table.return_value = mock_table_with_items([{"id": "test1"}])
        response = handle_launches()
        assert response['statusCode'] == 200
        assert len(json.loads(response['body'])) == 1

def test_handle_launch_by_id_found():
    with patch("app.dynamodb") as mock_dynamo:
        mock_dynamo.Table.return_value = mock_table_with_items([{"id": "test1"}])
        event = {'queryStringParameters': {'id': 'test1'}}
        response = handle_launch_by_id(event)
        assert response['statusCode'] == 200

def test_handle_rockets_success():
    with patch("app.dynamodb") as mock_dynamo:
        mock_dynamo.Table.return_value = mock_table_with_items([{"name": "Falcon 9"}])
        response = handle_rockets()
        assert "Falcon 9" in response['body']

def test_handle_launchpads_success():
    with patch("app.dynamodb") as mock_dynamo:
        mock_dynamo.Table.return_value = mock_table_with_items([{"name": "KSC LC 39A"}])
        response = handle_launchpads()
        assert "KSC LC 39A" in response['body']

def test_invalid_route():
    response = lambda_handler({'path': '/invalid', 'httpMethod': 'GET'}, None)
    assert response['statusCode'] == 404
