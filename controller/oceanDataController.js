const OceanData = require("../model/oceanData");

const oceanDataModel = new OceanData();

const addOceanData = async (req, res) => {
  try {
    const result = await oceanDataModel.save(req.body);
    res.json({ message: "Data saved successfully", result });
  } catch (error) {
    const errorMessage = error.message;
    res
      .status(500)
      .json({ message: "Failed to save data", error: errorMessage });
  }
};

const getOceanData = async (req, res) => {
  try {
    const data = await oceanDataModel.getAll();
    res.json({ message: "Data retrieved successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

module.exports = { addOceanData, getOceanData };
