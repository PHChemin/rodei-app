import { HeaderMenuItemProps } from "@/components/ui/header/header-menu";
import { t } from "@/services/lang";
import pb from "@/services/pb";
import { router } from "expo-router";

export const mainMenuItems: HeaderMenuItemProps[] = [
  {
    icon: {
      type: "antdesign",
      name: "home",
    },
    title: t("Início"),
    onPress: () => router.push("/(auth)/home"),
  },
  {
    icon: {
      type: "antdesign",
      name: "user",
    },
    title: t("Meu Perfil"),
    onPress: () => router.push("/(auth)/profile"),
  },
  {
    icon: {
      type: "antdesign",
      name: "message1",
    },
    title: t("Opine sobre o app!"),
    onPress: () => router.push("/(auth)/user-feedback"),
  },
  {
    icon: {
      type: "antdesign",
      name: "logout",
    },
    title: t("Sair"),
    onPress: () => {
      pb.authStore.clear();
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/");
    },
  },
];
