import { Log } from "@/services/logger";
import * as Updates from "expo-updates";

export async function checkEASUpdates() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Log.i("Application updated via EAS Update.");
      await Updates.reloadAsync();
    }
  } catch (error) {
    //expo updates does not work on local development environment, so skip errors
    if (!__DEV__) {
      Log.e(`Error fetching latest Expo update: ${error}`);
    }
  }
}
