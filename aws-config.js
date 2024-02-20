const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");

const poolData = {
  UserPoolId: "<YourUserPoolId>",
  ClientId: "<YourClientId>",
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const awsConfig = {
  region: "<YourRegion>",
  userPool,
};

AWS.config.update({
  region: awsConfig.region,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = { awsConfig, dynamoDB };
