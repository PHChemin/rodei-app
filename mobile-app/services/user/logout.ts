import { router } from "expo-router";

import { useToken } from "@/hooks/use-token";
import { api } from "../api/api";
import { getDeviceId } from "../deviceId";
import { Log } from "../logger";

export function logout() {
  api()
    .post("/logout", {
      device_name: getDeviceId,
    })
    .then(() => {
      useToken.getState().clearToken();
      router.dismissAll();
      router.replace("/");
    })
    .catch((err) => {
      Log.e(err);
    });
}
