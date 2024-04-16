import { dynamoDB } from "../aws-config.mjs";
import { v4 as uuidv4 } from "uuid";

const tableName = "Ocean-Data";

class OceanData {
  async save(data) {
    const { deviceId, sensorData } = data;
    const timestamp = Date.now().toString(); // Convert timestamp to string

    // If deviceId is not provided, generate a new one
    const id = deviceId ? deviceId : uuidv4();

    const newSensorData = {
      pH: sensorData.pH,
      Conductivity: sensorData.Conductivity,
      Temperature: sensorData.Temperature,
      WaterPressure: sensorData.WaterPressure,
      AirPressure: sensorData.AirPressure,
      UVLevels: sensorData.UVLevels,
      timestamp: timestamp, // Store timestamp as string
    };

    const params = {
      TableName: tableName,
      Key: {
        DeviceID: id,
      },
      UpdateExpression:
        "SET sensorData = list_append(if_not_exists(sensorData, :empty_list), :new_data)",
      ExpressionAttributeValues: {
        ":empty_list": [],
        ":new_data": [newSensorData],
      },
      ReturnValues: "UPDATED_NEW",
    };

    await dynamoDB.update(params).promise();
    return { deviceId: id, timestamp };
  }

  async getAll() {
    const params = {
      TableName: tableName,
    };

    const result = await dynamoDB.scan(params).promise();
    return result.Items.map((item) => unmarshall(item));
  }

  async getByDeviceId(deviceId) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: "DeviceID = :device_id",
      ExpressionAttributeValues: marshall({
        ":device_id": deviceId,
      }),
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items.map((item) => unmarshall(item));
  }
}

export default OceanData;
