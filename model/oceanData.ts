import { dynamoDB } from "../aws-config";
import AWS from "aws-sdk";

interface OceanDataAttributes {
  DeviceID: string; // Partition key
  Timestamp: string; // Sort key
  salinity: number;
  uv: number;
  temperature: number;
}

class OceanData {
  private tableName: string = "OceanData";
  async save(
    oceanData: OceanDataAttributes
  ): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: oceanData,
    };

    return dynamoDB.put(params).promise();
  }

  async getAll(): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    return dynamoDB.scan(params).promise();
  }

  // Example query method based on DeviceID and optional time range
  async getByDeviceID(
    deviceID: string,
    startTimestamp?: string,
    endTimestamp?: string
  ): Promise<AWS.DynamoDB.DocumentClient.QueryOutput> {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression:
        "#DeviceID = :deviceID" +
        (startTimestamp && endTimestamp
          ? " AND #Timestamp BETWEEN :start AND :end"
          : ""),
      ExpressionAttributeNames: {
        "#DeviceID": "DeviceID",
        "#Timestamp": "Timestamp",
      },
      ExpressionAttributeValues: {
        ":deviceID": deviceID,
        ...(startTimestamp &&
          endTimestamp && { ":start": startTimestamp, ":end": endTimestamp }),
      },
    };

    return dynamoDB.query(params).promise();
  }
}

export default OceanData;
