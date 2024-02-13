import { Request, Response } from "express";
import OceanData from "../model/oceanData";

const oceanDataModel = new OceanData();

export const addOceanData = async (req: Request, res: Response) => {
  try {
    const result = await oceanDataModel.save(req.body);
    res.json({ message: "Data saved successfully", result });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ message: "Failed to save data", error: errorMessage });
  }
};

export const getOceanData = async (req: Request, res: Response) => {
  try {
    const data = await oceanDataModel.getAll();
    res.json({ message: "Data retrieved successfully", data });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve data", error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
