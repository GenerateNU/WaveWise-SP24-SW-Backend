// authModel.js
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import { userPool } from "../aws-config.mjs";

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.cognitoUser = new CognitoUser({
      Username: this.email,
      Pool: userPool,
    });
  }

  signup() {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: this.email,
      }),
    ];

    return new Promise((resolve, reject) => {
      userPool.signUp(
        this.email,
        this.password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            // The user has been successfully signed up but is not confirmed yet
            resolve(result.user);
          }
        }
      );
    });
  }

  confirmSignup(verificationCode) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmRegistration(
        verificationCode,
        true,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            // The user is now confirmed
            resolve(result);
          }
        }
      );
    });
  }

  authenticate() {
    const authenticationDetails = new AuthenticationDetails({
      Username: this.email,
      Password: this.password,
    });

    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          // The session parameter has the session tokens
          const tokens = {
            accessToken: session.getAccessToken().getJwtToken(),
            idToken: session.getIdToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
          };
          resolve(tokens);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  changePassword(oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      this.cognitoUser.changePassword(
        oldPassword,
        newPassword,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  updateEmail(newEmail) {
    const attributes = [
      {
        Name: "email",
        Value: newEmail,
      },
    ];

    return new Promise((resolve, reject) => {
      this.cognitoUser.updateAttributes(attributes, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  logout() {
    this.cognitoUser.signOut();
  }
}

export default User;
