import FlashMessage from "@/components/shared/flash-message";
import AppHeader from "@/components/shared/header/app-header";
import HeaderMenu from "@/components/shared/header/header-menu";
import Modal from "@/components/shared/modal";
import { UpdateProvider } from "@/components/shared/update-provider";
import useAppVersionCheck from "@/hooks/use-app-version-check";
import { mainMenuItems } from "@/menus/mainMenuItems";
import theme, { COLORS } from "@/services/theme";
import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function _layout() {
  useAppVersionCheck();

  return (
    <UpdateProvider>
      <ThemeProvider theme={theme}>
        <FlashMessage.Provider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.BACKGROUND },
              header: (props: any) => <AppHeader {...props} />,
              headerRight: () => <HeaderMenu items={mainMenuItems} />,
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
