import { Text, TextProps, makeStyles } from "@rneui/themed";
import { PropsWithChildren } from "react";

export function InputLabel({
  children,
  ...rest
}: PropsWithChildren & TextProps) {
  const styles = useStyles();

  return (
    <Text h4 h4Style={[styles.label, rest.style]} {...rest}>
      {children}
    </Text>
  );
}

const useStyles = makeStyles(() => ({
  label: {
    marginBottom: 0,
    fontWeight: "regular",
  },
}));
