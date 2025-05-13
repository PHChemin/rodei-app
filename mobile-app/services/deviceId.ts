import * as Device from "expo-device";
import { Platform } from "react-native";
import * as Crypto from "expo-crypto";

import * as SecureStore from "expo-secure-store";

const getId = () => {
  const storedId = SecureStore.getItem("secure_deviceid");

  if (storedId) {
    return storedId;
  } else {
    let newId = Crypto.randomUUID();
    SecureStore.setItem("secure_deviceid", newId);
    return newId;
  }
};

export const getDeviceId = () => {
  if (Platform.OS == "web") return "web";

  const brand =
    Device.brand || Device.manufacturer || Device.osName || Platform.OS;

  const detail =
    Device.modelName ||
    (Platform.OS === "ios"
      ? Device.modelId || Device.deviceType
      : Device.productName || Device.designName);

  const id = getId();

  return `${brand} ${detail} ${id}`;
};
