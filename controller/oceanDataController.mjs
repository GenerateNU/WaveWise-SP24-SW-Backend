import OceanData from "../model/oceanData.mjs";

const oceanDataModel = new OceanData();

export const addOceanData = async (req, res) => {
  try {
    const { deviceId, sensorData } = req.body;
    const { deviceId: savedDeviceId, timestamp } = await oceanDataModel.save({
      deviceId,
      sensorData,
    });
    res.json({
      message: "Data saved successfully",
      deviceId: savedDeviceId,
      timestamp,
    });
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

export const getOceanDataByDeviceId = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const data = await oceanDataModel.getByDeviceId(deviceId);
    res.json({ message: "Data retrieved successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};
