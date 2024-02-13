import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { awsConfig } from "../aws-config";

class Admin {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  authenticate(): Promise<any> {
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

export default Admin;
