import Constants from "expo-constants";
import { useEffect } from "react";
import { Linking, Platform } from "react-native";

import useModal from "@/hooks/use-modal";
import pb from "@/services/pb";
import { compareVersions } from "compare-versions";
import { Button, Text } from "@rneui/themed";

import { Log } from "@/services/logger";
import { t } from "i18next";

export default function useAppVersionCheck() {
  const modal = useModal();

  const handleOpenStore = () => {
    switch (Platform.OS) {
      case "android":
        Linking.openURL(process.env.EXPO_PUBLIC_GOOGLE_PLAY_STORE_LINK);
        break;
      case "ios":
        Linking.openURL(process.env.EXPO_PUBLIC_APPLE_APP_STORE_LINK);
        break;
      default:
        Log.e("Platform not supported");
    }
  };

  const checkVersion = async () => {
    try {
      const config = await pb.collection("app_config").getFirstListItem("");

      const currentVersion = Constants.expoConfig?.version;

      const latestVersion =
        Platform.OS === "android" ? config.android_version : config.ios_version;

      if (compareVersions(currentVersion || "0.0.0", latestVersion) < 0) {
        modal.showModal(
          <>
            <Text style={{ fontWeight: "bold" }}>
              {t("components.version-checker.update")}
            </Text>

            <Text
              style={{ textAlign: "justify", marginTop: 16, marginBottom: 16 }}
            >
              {t("components.version-checker.message")}
            </Text>

            <Button
              onPress={handleOpenStore}
              title={t("components.version-checker.update-now")}
            />
          </>
        );
      }
    } catch (e) {
      Log.pretty({
        message:
          "Check version failed! app_config collection was set on backend?",
        error: e,
      });
    }
  };

  useEffect(() => {
    checkVersion();
  }, []);
}
