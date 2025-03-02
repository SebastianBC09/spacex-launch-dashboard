import json
import boto3
from decimal import Decimal
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj) if obj % 1 != 0 else int(obj)
    elif obj is None:
        return None
    raise TypeError

def format_response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        "body": json.dumps(body, default=decimal_default)
    }

def handle_launches():
    try:
        table = dynamodb.Table('SpaceXLaunches')
        response = table.scan()
        return format_response(200, response.get('Items', []))
    except Exception as e:
        return format_response(500, {"error": str(e)})

def handle_launch_by_id(event):
    try:
        launch_id = event['pathParameters']['id']

        if not launch_id:
            return format_response(400, {"error": "Parámetro 'id' requerido"})

        table = dynamodb.Table('SpaceXLaunches')
        response = table.get_item(Key={'id': launch_id})

        if 'Item' not in response:
            return format_response(404, {"error": f"Lanzamiento con ID {launch_id} no encontrado"})

        item = response['Item']

        required_fields = ['date_utc', 'mission_name', 'launchpad_id', 'rocket_id', 'status']
        for field in required_fields:
            if field not in item or item.get(field) is None:
                return format_response(500, {"error": f"Campo '{field}' inválido"})

        return format_response(200, item)

    except Exception as e:
        return format_response(500, {"error": str(e)})

def handle_rockets():
    try:
        table = dynamodb.Table('SpaceXRockets')
        response = table.scan()
        return format_response(200, response.get('Items', []))
    except Exception as e:
        return format_response(500, {"error": str(e)})

def handle_launchpads():
    try:
        table = dynamodb.Table('SpaceXLaunchpads')
        response = table.scan()
        return format_response(200, response.get('Items', []))
    except Exception as e:
        return format_response(500, {"error": str(e)})

def handle_launchpads():
    try:
        table = dynamodb.Table('SpaceXLaunchpads')
        response = table.scan()
        return format_response(200, response.get('Items', []))
    except Exception as e:
        return format_response(500, {"error": str(e)})

def lambda_handler(event, context):
    try:
        resource = event.get('resource', '')

        if resource == '/launches':
            return handle_launches()
        elif resource == '/launches/{id}':
            return handle_launch_by_id(event)
        elif resource == '/rockets':
            return handle_rockets()
        elif resource == '/launchpads':
            return handle_launchpads()
        else:
            return format_response(404, {"error": "Ruta no encontrada"})

    except Exception as e:
        return format_response(500, {"error": str(e)})
