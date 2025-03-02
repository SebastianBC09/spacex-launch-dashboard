import json
import requests
import boto3

def transform_launch_data(launch):
    if launch["upcoming"]:
        status = "scheduled"
    else:
        status = "success" if launch["success"] else "failed"

    return {
        "id": launch["id"],
        "mission_name": launch["name"],
        "status": status,
        "date_utc": launch["date_utc"],
        "rocket_id": launch["rocket"],
        "launchpad_id": launch["launchpad"],
        "details": launch.get("details", "")
    }

def fetch_launch_data():
    response = requests.get("https://api.spacexdata.com/v4/launches")
    response.raise_for_status()
    return response.json()

def save_to_dynamodb(items, table_name):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    with table.batch_writer() as batch:
        for item in items:
            batch.put_item(Item=item)

def lambda_handler(event, context):
    try:
        raw_data = fetch_launch_data()
        transformed_data = [transform_launch_data(item) for item in raw_data]
        save_to_dynamodb(transformed_data, "SpaceXLaunches")

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Datos actualizados",
                "count": len(transformed_data)
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
