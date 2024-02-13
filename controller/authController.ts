import { Request, Response } from "express";
import Admin from "../model/authModel";
export const authenticateAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = new Admin(email, password);

  try {
    const result = await admin.authenticate();
    res.json({ message: "Authentication successful", result });
  } catch (error) {
    res.status(400).json({ message: "Authentication failed", error });
  }
};
