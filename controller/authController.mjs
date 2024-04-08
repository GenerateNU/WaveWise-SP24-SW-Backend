// Import the User model (adjust the path as necessary)
import User from "../model/authModel.mjs";

// Helper function to generate a standard API Gateway response
const generateResponse = (statusCode, message, data = {}, cookies = []) => ({
  isBase64Encoded: false,
  statusCode: statusCode,
  headers: {
    "Content-Type": "application/json",
    ...(cookies.length > 0 && { "Set-Cookie": cookies }),
  },
  body: JSON.stringify({
    success: statusCode >= 200 && statusCode < 300,
    message: message,
    ...data,
  }),
});

export const signup = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    const cognitoUser = await user.signup();
    return generateResponse(200, "User signed up successfully", {
      user: cognitoUser,
    });
  } catch (error) {
    return generateResponse(400, "Signup failed", { error: error.message });
  }
};

export const confirmSignup = async (event) => {
  const { email, verificationCode, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    await user.confirmSignup(verificationCode);
    const tokens = await user.authenticate();
    const cookie = `token=${tokens.idToken}; HttpOnly; Max-Age=${
      30 * 24 * 60 * 60
    }; Secure; Path=/`;
    return generateResponse(
      200,
      "Signup confirmed and user logged in",
      { tokens },
      [cookie]
    );
  } catch (error) {
    return generateResponse(400, "Failed to confirm signup", {
      error: error.message,
    });
  }
};

export const login = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    const tokens = await user.authenticate();
    const cookie = `token=${tokens.idToken}; HttpOnly; Max-Age=${
      30 * 24 * 60 * 60
    }; Secure; Path=/`;
    return generateResponse(200, "Authentication successful", { tokens }, [
      cookie,
    ]);
  } catch (error) {
    return generateResponse(401, "Authentication failed", {
      error: error.message,
    });
  }
};

export const changePassword = async (event) => {
  const { email, oldPassword, newPassword } = JSON.parse(event.body);
  const user = new User(email, oldPassword);

  try {
    const result = await user.changePassword(oldPassword, newPassword);
    return generateResponse(200, "Password changed successfully", { result });
  } catch (error) {
    return generateResponse(400, "Failed to change password", {
      error: error.message,
    });
  }
};

export const updateEmail = async (event) => {
  const { email, newEmail, password } = JSON.parse(event.body);
  const user = new User(email, password);

  try {
    const result = await user.updateEmail(newEmail);
    return generateResponse(200, "Email updated successfully", { result });
  } catch (error) {
    return generateResponse(400, "Failed to update email", {
      error: error.message,
    });
  }
};

export const logout = async (event) => {
  const { email } = JSON.parse(event.body);
  const user = new User(email, "");

  try {
    user.logout();
    const cookie = "token=; HttpOnly; Max-Age=0; Secure; Path=/";
    return generateResponse(200, "Logged out successfully", {}, [cookie]);
  } catch (error) {
    return generateResponse(400, "Failed to log out", { error: error.message });
  }
};
