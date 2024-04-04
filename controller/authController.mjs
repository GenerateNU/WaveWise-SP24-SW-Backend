// authController.js
import User from "../model/authModel.mjs";
import cookie from "cookie"; // Make sure to install the 'cookie' package

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
  // Destructure the email, verificationCode, and password from the request body
  const { email, verificationCode, password } = req.body;

  // Create a new User instance with the provided email and password
  const user = new User(email, password);

  try {
    // Confirm the user's signup with the provided verification code
    await user.confirmSignup(verificationCode);

    // Authenticate the user after successful confirmation
    const tokens = await user.authenticate();

    // Serialize the cookie with the token
    const serializedCookie = cookie.serialize("token", tokens.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // Set cookie to expire after 30 days
    });

    // Set the 'Set-Cookie' header in the response
    res.setHeader("Set-Cookie", serializedCookie);

    // Send a JSON response with the success message and tokens
    res.status(200).json({
      success: true,
      message: "Signup confirmed and user logged in",
      tokens,
    });
  } catch (error) {
    // If an error occurs, send a JSON response with the error message
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
    // Set the session token as a cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", tokens.idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
    );
    res.json({ success: true, message: "Authentication successful" });
  } catch (error) {
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
    res.clearCookie("token", { path: "/" });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to log out",
      error: error.message,
    });
  }
};
