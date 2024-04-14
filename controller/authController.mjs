import User from "../model/authModel.mjs";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new User(email, password);

  try {
    const cognitoUser = await user.signup();
    res.status(200).json({
      success: true,
      message: "User signed up successfully",
      user: cognitoUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};
export const confirmSignup = async (event) => {
  const { email, verificationCode, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    await user.confirmSignup(verificationCode);
    const tokens = await user.authenticate();

    // Set the JWT token as a cookie in the response
    const response = {
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
    return response;
  } catch (error) {
    console.error(error);
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

    // Set the JWT token as a cookie in the response
    res
      .status(200)
      .cookie("token", tokens.idToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: true,
        path: "/",
      })
      .json({
        success: true,
        message: "Authentication successful",
        tokens,
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = new User(email, oldPassword);

  try {
    const result = await user.changePassword(oldPassword, newPassword);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to change password",
      error: error.message,
    });
  }
};

export const updateEmail = async (req, res) => {
  const { email, newEmail, password } = req.body;
  const user = new User(email, password);

  try {
    const result = await user.updateEmail(newEmail);
    res.status(200).json({
      success: true,
      message: "Email updated successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to update email",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const { email } = req.body;
  const user = new User(email, "");

  try {
    user.logout();

    // Clear the JWT token cookie in the response
    res.status(200).clearCookie("token").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to log out",
      error: error.message,
    });
  }
};
