import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('matthewjlim.com')
def lambda_handler(event, context):
    # Get current view count
    response = table.get_item(Key={
        'id':'0'
    })
    views = response['Item']['views']
    
    # Check HTTP method - only increment on POST requests
    http_method = event.get('requestContext', {}).get('http', {}).get('method', 'GET')
    
    if http_method == 'POST':
        # New session - increment counter
        views = views + 1
        print(f"New session - incrementing to {views}")
        table.put_item(Item={
            'id':'0',
            'views': views
        })
    else:
        # Existing session - just return current count
        print(f"Existing session - returning current count: {views}")

    return {'views': views}
