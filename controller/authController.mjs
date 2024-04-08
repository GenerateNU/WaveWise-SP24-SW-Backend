import User from "../model/authModel.mjs";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new User(email, password);

  try {
    const cognitoUser = await user.signup();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "User signed up successfully",
        user: cognitoUser,
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Signup failed",
        error: error.message,
      }),
    };

    return response;
  }
};

export const confirmSignup = async (req, res) => {
  const { email, verificationCode, password } = req.body;
  const user = new User(email, password);

  try {
    await user.confirmSignup(verificationCode);
    const tokens = await user.authenticate();

    // Set the cookies in the response object
    const response = {
      statusCode: 200,
      headers: {
        "Set-Cookie": [
          `token=${tokens.idToken}; HttpOnly; Max-Age=${
            30 * 24 * 60 * 60
          }; Secure; Path=/`,
          `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${
            30 * 24 * 60 * 60
          }; Secure; Path=/`,
        ],
      },
      body: JSON.stringify({
        success: true,
        message: "Signup confirmed and user logged in",
        tokens,
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to confirm signup",
        error: error.message,
      }),
    };

    return response;
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = new User(email, password);

  try {
    const tokens = await user.authenticate();

    // Set the cookies in the response object
    const response = {
      statusCode: 200,
      headers: {
        "Set-Cookie": [
          `token=${tokens.idToken}; HttpOnly; Max-Age=${
            30 * 24 * 60 * 60
          }; Secure; Path=/`,
          `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${
            30 * 24 * 60 * 60
          }; Secure; Path=/`,
        ],
      },
      body: JSON.stringify({
        success: true,
        message: "Authentication successful",
        tokens,
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 401,
      body: JSON.stringify({
        success: false,
        message: "Authentication failed",
        error: error.message,
      }),
    };

    return response;
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = new User(email, oldPassword);

  try {
    const result = await user.changePassword(oldPassword, newPassword);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Password changed successfully",
        result,
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to change password",
        error: error.message,
      }),
    };

    return response;
  }
};

export const updateEmail = async (req, res) => {
  const { email, newEmail, password } = req.body;
  const user = new User(email, password);

  try {
    const result = await user.updateEmail(newEmail);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email updated successfully",
        result,
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to update email",
        error: error.message,
      }),
    };

    return response;
  }
};

export const logout = async (req, res) => {
  const { email } = req.body;
  const user = new User(email, "");

  try {
    user.logout();

    // Clear the cookies in the response object
    const response = {
      statusCode: 200,
      headers: {
        "Set-Cookie": [
          `token=; HttpOnly; Max-Age=0; Secure; Path=/`,
          `refreshToken=; HttpOnly; Max-Age=0; Secure; Path=/`,
        ],
      },
      body: JSON.stringify({
        success: true,
        message: "Logged out successfully",
      }),
    };

    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to log out",
        error: error.message,
      }),
    };

    return response;
  }
};
