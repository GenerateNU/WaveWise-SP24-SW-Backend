import { dynamoDB } from "../aws-config.mjs";
import { v4 as uuidv4 } from "uuid";

const tableName = "OceanData";

class OceanData {
  async save(data) {
    const {
      deviceId,
      pH,
      Conductivity,
      Temperature,
      WaterPressure,
      AirPressure,
      UVLevels,
    } = data;
    const timestamp = Date.now();

    const id = deviceId ? deviceId : uuidv4();

    const params = {
      TableName: tableName,
      Item: {
        deviceId: id,
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
    return { ...data, deviceId: id };
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
