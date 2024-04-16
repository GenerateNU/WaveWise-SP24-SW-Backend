import OceanData from "../model/oceanData.mjs";

const oceanDataModel = new OceanData();

export const addOceanData = async (req, res) => {
  try {
    const { deviceId, sensorData } = req.body;
    const result = await oceanDataModel.save({ deviceId, sensorData });
    res.json({ message: "Data saved successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save data", error: error.message });
  }
};

export const getOceanData = async (req, res) => {
  try {
    const data = await oceanDataModel.getAll();
    res.json({ message: "Data retrieved successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};
