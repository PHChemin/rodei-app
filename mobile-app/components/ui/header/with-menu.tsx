import { Stack } from "expo-router";

import { useToken } from "@/hooks/use-token";
import { getMenuItems } from "@/menus/mainMenuItems";

import HeaderMenu from "./header-menu";

export function WithMenu() {
  const { user } = useToken();

  const mainMenuItems = getMenuItems(user!.is_manager);

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerRight: () => <HeaderMenu items={mainMenuItems} />,
      }}
    />
  );
}
