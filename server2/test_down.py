import boto3

file_name = 'test_1.jpg'
bucket = 'converter-upload-bucket'
key = 'pdf to png/1707723129593-file_page1.png'

client = boto3.client('s3')
client.download_file(bucket, key, file_name)