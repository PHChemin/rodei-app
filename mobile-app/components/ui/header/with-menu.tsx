import { Stack } from "expo-router";

import { mainMenuItems } from "@/menus/mainMenuItems";
import HeaderMenu from "./header-menu";

export function WithMenu() {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerRight: () => <HeaderMenu items={mainMenuItems} />,
      }}
    />
  );
}
