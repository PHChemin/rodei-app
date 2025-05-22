import { useTheme } from "@rneui/themed";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type FullscreenProps = {
  center?: boolean;
  padding?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
} & PropsWithChildren;

export default function Fullscreen({
  children,
  center,
  padding = "lg",
}: FullscreenProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        center && styles.center,
        padding !== "none" && { padding: theme.spacing[padding] },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
