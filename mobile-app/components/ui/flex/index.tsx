import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

type FlexProps = {
  children: ReactNode;
  direction?: "row" | "column";
  gap?: number;
  align?: "flex-start" | "flex-end" | "center" | "stretch";
  justify?: "flex-start" | "flex-end" | "center" | "space-between";
} & ViewProps;

export function Flex({
  children,
  direction = "row",
  gap,
  align = "center",
  justify,
  style,
  ...rest
}: FlexProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: direction,
          gap: gap ? gap : theme.spacing.xl,
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
