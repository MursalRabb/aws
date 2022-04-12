import json
import io
import boto3

dynamo_db = boto3.resource('dynamodb')
students_table = dynamo_db.Table('todos')
s3 = boto3.resource('s3')
bucket_name = 'todo-s3bucket'

def lambda_handler(event, context):
    print(event, "printing event")
    data = {
        "id": event.get("id"),
        "firstname": event.get('firstname'),
        "lastname": event.get('lastname'),
        "grade": event.get('grade')
    }
    
    filename = event.get('id') + '.json'
    path = '/tmp/' + filename
    
    f = open(path, 'w', encoding='UTF-8')
    json.dump(data, f)
    file = open(path, 'rb')
    
    bucket = s3.Bucket(bucket_name)
    bucket_object = bucket.Object(filename)
    bucket_object.upload_fileobj(file)
    

    students_table.put_item(Item=data)
    return {"statusCode":200, "message": "Item added successfully"}