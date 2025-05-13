import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useNavigationExitOnBack() {
  const navigation = useNavigation();

  useEffect(() => {
    const callback = (e: any) => {
      if (e.data?.action?.type === "GO_BACK") {
        e.preventDefault();
        BackHandler.exitApp();
      }
    };

    navigation.addListener("beforeRemove", callback);

    return () => navigation.removeListener("beforeRemove", callback);
  }, []);
}
