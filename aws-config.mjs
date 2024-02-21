// import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import AWS from "aws-sdk";

// const poolData = {
//   UserPoolId: "<YourUserPoolId>",
//   ClientId: "<YourClientId>",
// };

// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// const awsConfig = {
//   region: "<YourRegion>",
//   userPool,
// };

AWS.config.update({
  region: awsConfig.region,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export { awsConfig, dynamoDB };
