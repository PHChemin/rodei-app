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

const managerMenu: HeaderMenuItemProps[] = [
  {
    icon: { type: "material-community", name: "currency-usd" },
    title: "Balanço Financeiro",
    onPress: () => router.push("/manager/financial-statement"),
  },
  ...userMenu,
];

const driverMenu: HeaderMenuItemProps[] = [
  {
    icon: { type: "material-community", name: "clock-outline" },
    title: "Histórico de Fretes",
    onPress: () => router.push("/driver/history/freights"),
  },
  ...userMenu,
];

export function getMenuItems(isManager: boolean) {
  return isManager ? managerMenu : driverMenu;
}
