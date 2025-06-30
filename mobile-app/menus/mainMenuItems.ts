import { HeaderMenuItemProps } from "@/components/ui/header/header-menu";
import pb from "@/services/pb";
import { logout } from "@/services/user/logout";
import { router } from "expo-router";

export const mainMenuItems: HeaderMenuItemProps[] = [
  {
    icon: {
      type: "antdesign",
      name: "home",
    },
    title: "Início",
    onPress: () => router.push("/(auth)/home"),
  },
  {
    icon: {
      type: "antdesign",
      name: "user",
    },
    title: "Meu Perfil",
    onPress: () => router.push("/(auth)/profile"),
  },
  {
    icon: {
      type: "antdesign",
      name: "message1",
    },
    title: "Opine sobre o app!",
    onPress: () => router.push("/(auth)/user-feedback"),
  },
  {
    icon: {
      type: "antdesign",
      name: "logout",
    },
    title: "Sair",
    onPress: () => {
      logout();
    },
  },
];
