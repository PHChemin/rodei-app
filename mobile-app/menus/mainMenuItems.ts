import { HeaderMenuItemProps } from "@/components/ui/header/header-menu";
import { logout } from "@/services/user/logout";
import { router } from "expo-router";

// Routes that are common to both roles
const userMenu: HeaderMenuItemProps[] = [
  {
    icon: { type: "material-community", name: "account-outline" },
    title: "Meu Perfil",
    onPress: () => router.push("/my-profile"),
  },
  {
    icon: { type: "antdesign", name: "message1" },
    title: "Opine sobre o app!",
    onPress: () => router.push("/(auth)/user-feedback"),
  },
  {
    icon: { type: "material-community", name: "logout" },
    title: "Sair",
    onPress: logout,
  },
];

const managerMenu: HeaderMenuItemProps[] = [...userMenu];

const driverMenu: HeaderMenuItemProps[] = [...userMenu];

export function getMenuItems(isManager: boolean) {
  return isManager ? managerMenu : driverMenu;
}
