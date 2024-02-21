import { dynamoDB } from "../aws-config.mjs";

class OceanData {
  constructor() {
    this.tableName = "OceanData";
  }

  async save(oceanData) {
    const params = {
      TableName: this.tableName,
      Item: oceanData,
    };
    return dynamoDB.put(params).promise();
  }

  async getAll() {
    const params = {
      TableName: this.tableName,
    };
    return dynamoDB.scan(params).promise();
  }

  async getByDeviceID(deviceID, startTimestamp, endTimestamp) {
    let keyConditionExpression = "#DeviceID = :deviceID";
    const expressionAttributeValues = {
      ":deviceID": deviceID,
    };

    if (startTimestamp && endTimestamp) {
      keyConditionExpression += " AND #Timestamp BETWEEN :start AND :end";
      expressionAttributeValues[":start"] = startTimestamp;
      expressionAttributeValues[":end"] = endTimestamp;
    }

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeNames: {
        "#DeviceID": "DeviceID",
        "#Timestamp": "Timestamp",
      },
      ExpressionAttributeValues: expressionAttributeValues,
    };

    return dynamoDB.query(params).promise();
  }
}

export default OceanData;
