import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import useAppVersionCheck from "@/hooks/use-app-version-check";
import theme from "@/services/theme/theme";

import FlashMessage from "@/components/shared/flash-message";
import { UpdateProvider } from "@/components/shared/update-provider";
import { Modal } from "@/components/ui";

export default function _layout() {
  useAppVersionCheck();

  return (
    <UpdateProvider>
      <ThemeProvider theme={theme}>
        <FlashMessage.Provider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerBackVisible: true,
            }}
          />

          <Modal />
        </FlashMessage.Provider>

        <StatusBar style="dark" />
      </ThemeProvider>
    </UpdateProvider>
  );
}
