const Admin = require("../model/authModel.mjs");

export const authenticateAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = new Admin(email, password);

  try {
    const result = await admin.authenticate();
    res.json({ message: "Authentication successful", result });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Authentication failed", error: error.toString() });
  }
};
