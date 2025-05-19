import { colors } from "@/services/theme/constants";
import { makeStyles } from "@rneui/themed";
import { Stack } from "expo-router";
import AppHeader from "./app-header";

type WithTitleProps = {
  title: string;
};

export function WithTitle({ title }: WithTitleProps) {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        contentStyle: { backgroundColor: colors.background },
        header: (props: any) => <AppHeader {...props} />,
        title,
      }}
    />
  );
}
