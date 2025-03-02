import json
import requests
import boto3
from decimal import Decimal

ENDPOINTS = {
    "rockets": "https://api.spacexdata.com/v4/rockets",
    "launchpads": "https://api.spacexdata.com/v4/launchpads"
}

def save_to_dynamodb(items: list, table_name: str) -> None:
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(table_name)

    for item in items:
        update_expression = "SET "
        expression_attr_values = {}
        expression_attr_names = {}

        for key, value in item.items():
            if key == "id":
                continue
            update_expression += f"#{key} = :{key}, "
            expression_attr_names[f"#{key}"] = key
            expression_attr_values[f":{key}"] = value

        update_expression = update_expression.rstrip(", ")

        table.update_item(
            Key={"id": item["id"]},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attr_names,
            ExpressionAttributeValues=expression_attr_values,
            ReturnValues="UPDATED_NEW"
        )

def transform_item(raw_item, entity):
    if entity == "rockets":
        return {
            "id": raw_item["id"],
            "name": raw_item["name"],
            "type": raw_item["type"],
            "active": raw_item["active"],
            "cost_per_launch": Decimal(str(raw_item["cost_per_launch"])),
            "success_rate_pct": Decimal(str(raw_item["success_rate_pct"])),
            "flickr_images": raw_item["flickr_images"],
            "description": raw_item["description"],
            "height_m": Decimal(str(raw_item["height"]["meters"])),
            "diameter_m": Decimal(str(raw_item["diameter"]["meters"])),
            "mass_kg": Decimal(str(raw_item["mass"]["kg"])),
            "engines_type": raw_item["engines"]["type"],
            "wikipedia": raw_item["wikipedia"]
        }
    elif entity == "launchpads":
        return {
            "id": raw_item["id"],
            "name": raw_item["name"],
            "full_name": raw_item["full_name"],
            "locality": raw_item["locality"],
            "region": raw_item["region"],
            "latitude": Decimal(str(raw_item["latitude"])),
            "longitude": Decimal(str(raw_item["longitude"])),
            "launch_attempts": raw_item["launch_attempts"],
            "launch_successes": raw_item["launch_successes"],
            "images": raw_item["images"]["large"],
            "status": raw_item["status"],
            "details": raw_item["details"]
        }
    else:
        raise ValueError(f"Entidad no válida: {entity}")

def lambda_handler(event, context):
    try:
        entity = event["entity"]
        raw_data = requests.get(ENDPOINTS[entity]).json()

        transformed_data = [
            transform_item(item, entity)
            for item in raw_data
        ]

        save_to_dynamodb(
            items=transformed_data,
            table_name=f"SpaceX{entity.capitalize()}"
        )
        return {
            "statusCode": 200,
            "body": json.dumps(f"{len(transformed_data)} {entity} actualizados")
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
