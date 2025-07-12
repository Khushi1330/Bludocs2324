import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;


export const saveMetadata = async ({ key, fileName, size, contentType, userId }) => {
  const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
  if (!TABLE_NAME) {
    throw new Error("DYNAMO_TABLE_NAME environment variable is not defined.");
  }
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: {
      userId: { S: userId },
      timestamp: { S: Date.now().toString() },
      fileKey: { S: key },
      fileName: { S: fileName },
      fileSize: { N: size.toString() },
      contentType: { S: contentType },
    },
  });

  await client.send(command);
};

export const getDocumentsByUser = async (userId) => {
  const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
  if (!TABLE_NAME) {
    throw new Error("DYNAMO_TABLE_NAME environment variable is not defined.");
  }

  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: {
      ":uid": { S: userId },
    },
  });

  const result = await client.send(command);
  return result.Items.map((item) => unmarshall(item));
};
