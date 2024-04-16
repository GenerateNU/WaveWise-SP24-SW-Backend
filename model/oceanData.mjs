import { dynamoDB } from "../aws-config.mjs";
import { v4 as uuidv4 } from "uuid";

const tableName = "OceanData";

class OceanData {
  async save(data) {
    const {
      pH,
      Conductivity,
      Temperature,
      WaterPressure,
      AirPressure,
      UVLevels,
    } = data;
    const deviceId = uuidv4();
    const timestamp = Date.now();

    const params = {
      TableName: tableName,
      Item: {
        deviceId,
        pH,
        Conductivity,
        Temperature,
        WaterPressure,
        AirPressure,
        UVLevels,
        timestamp,
      },
    };

    await dynamoDB.put(params).promise();
    return { ...data, deviceId };
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
