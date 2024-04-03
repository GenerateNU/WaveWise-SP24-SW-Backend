import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";

AWS.config.update({ region: "us-east-1" });

const poolData = {
  UserPoolId: "us-east-1_dWwLpMDfP",
  ClientId: "3t7h8hf0l026ciaa9i2dbbvi1d",
};

const userPool = new CognitoUserPool(poolData);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export { userPool, dynamoDB, AWS };
