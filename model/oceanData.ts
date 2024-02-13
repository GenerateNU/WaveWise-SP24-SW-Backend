import { dynamoDB } from "../aws-config";
import AWS from "aws-sdk";

interface OceanDataAttributes {
  id: string;
  salinity: number;
  uv: number;
  temperature: number;
}

class OceanData {
  private tableName: string = "OceanDataTable";

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
}

export default OceanData;
