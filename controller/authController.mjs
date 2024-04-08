// authController.js
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

export const confirmSignup = async (req, res) => {
  const { email, verificationCode, password } = req.body;
  const user = new User(email, password);

  try {
    await user.confirmSignup(verificationCode);
    const tokens = await user.authenticate();

    // Set the cookie using res.setHeader()
    res.setHeader("Set-Cookie", [
      `token=${tokens.idToken}; HttpOnly; Max-Age=${
        30 * 24 * 60 * 60
      }; Secure; Path=/`,
      `refreshToken=${tokens.refreshToken}; HttpOnly; Max-Age=${
        30 * 24 * 60 * 60
      }; Secure; Path=/`,
    ]);

    // Send the success response
    res.status(200).json({
      success: true,
      message: "Signup confirmed and user logged in",
      tokens,
    });
  } catch (error) {
    // Send the error response
    res.status(400).json({
      success: false,
      message: "Failed to confirm signup",
      error: error.message,
    });
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
    res.json({
      success: true,
      message: "Password changed successfully",
      result,
    });
  } catch (error) {
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
    res.json({ success: true, message: "Email updated successfully", result });
  } catch (error) {
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

    // Clear the cookies using res.setHeader()
    res.setHeader("Set-Cookie", [
      `token=; HttpOnly; Max-Age=0; Secure; Path=/`,
      `refreshToken=; HttpOnly; Max-Age=0; Secure; Path=/`,
    ]);

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to log out",
      error: error.message,
    });
  }
};
