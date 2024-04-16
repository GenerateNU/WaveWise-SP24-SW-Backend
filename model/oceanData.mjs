import { dynamoDB } from "../aws-config.mjs";
import { v4 as uuidv4 } from "uuid";

const tableName = "OceanData";

class OceanData {
  async save(data) {
    const { deviceId, sensorData } = data;
    const timestamp = Date.now();

    // If deviceId is not provided, generate a new one
    const id = deviceId ? deviceId : uuidv4();

    const params = {
      TableName: tableName,
      Item: {
        deviceId: id,
        sensorData: [
          ...sensorData,
          {
            pH: sensorData.pH,
            Conductivity: sensorData.Conductivity,
            Temperature: sensorData.Temperature,
            WaterPressure: sensorData.WaterPressure,
            AirPressure: sensorData.AirPressure,
            UVLevels: sensorData.UVLevels,
            timestamp,
          },
        ],
      },
    };

    await dynamoDB.put(params).promise();
    return { deviceId: id, sensorData: params.Item.sensorData };
  }

  async getAll() {
    const params = {
      TableName: tableName,
    };

    const result = await dynamoDB.scan(params).promise();
    return result.Items;
  }
}

export default OceanData;
