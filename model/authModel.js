const {
  AuthenticationDetails,
  CognitoUser,
} = require("amazon-cognito-identity-js");
const { awsConfig } = require("../aws-config");

class Admin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  authenticate() {
    const authenticationDetails = new AuthenticationDetails({
      Username: this.email,
      Password: this.password,
    });

    const userData = {
      Username: this.email,
      Pool: awsConfig.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}

module.exports = Admin;
