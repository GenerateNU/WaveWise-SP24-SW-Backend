import User from "../model/authModel.mjs";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new User(email, password);

  try {
    const cognitoUser = await user.signup();
    res.json({
      success: true,
      message: "User signed up successfully",
      user: cognitoUser,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Signup failed", error: error.message });
  }
};

export const confirmSignup = async (event, context) => {
  const { email, verificationCode, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    await user.confirmSignup(verificationCode);
    const tokens = await user.authenticate();

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": `token=${tokens.idToken}; HttpOnly; Max-Age=${
          30 * 24 * 60 * 60
        }; Secure; Path=/`,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": event.headers.origin,
      },
      body: JSON.stringify({
        success: true,
        message: "Signup confirmed and user logged in",
        tokens,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to confirm signup",
        error: error.message,
      }),
    };
  }
};

export const login = async (event, context) => {
  const { email, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    const tokens = await user.authenticate();

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": `token=${tokens.idToken}; HttpOnly; Max-Age=${
          30 * 24 * 60 * 60
        }; Secure; Path=/`,
      },
      body: JSON.stringify({
        success: true,
        message: "Authentication successful",
        tokens,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 401,
      body: JSON.stringify({
        success: false,
        message: "Authentication failed",
        error: error.message,
      }),
    };
  }
};

export const changePassword = async (event, context) => {
  const { email, oldPassword, newPassword } = JSON.parse(event.body);
  const user = new User(email, oldPassword);

  try {
    const result = await user.changePassword(oldPassword, newPassword);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Password changed successfully",
        result,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to change password",
        error: error.message,
      }),
    };
  }
};

export const updateEmail = async (event, context) => {
  const { email, newEmail, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    const result = await user.updateEmail(newEmail);
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email updated successfully",
        result,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to update email",
        error: error.message,
      }),
    };
  }
};

export const logout = async (event, context) => {
  const { email } = JSON.parse(event.body);
  const user = new User(email, "");

  try {
    user.logout();

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": "token=; HttpOnly; Max-Age=0; Secure; Path=/",
      },
      body: JSON.stringify({
        success: true,
        message: "Logged out successfully",
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to log out",
        error: error.message,
      }),
    };
  }
};
