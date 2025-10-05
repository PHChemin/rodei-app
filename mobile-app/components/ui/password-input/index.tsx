import { useTheme } from "@rneui/themed";
import React, { useState } from "react";

import { TextInput, TextInputProps } from "../text-input";

export function PasswordInput(props: TextInputProps) {
  const { theme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      placeholder={props.placeholder ?? "****"}
      required
      labelProps={{ style: { marginTop: 0 } }}
      inputProps={{
        rightIcon: {
          type: "feather",
          name: showPassword ? "eye" : "eye-off",
          color: theme.colors.primary,
          onPress: () => {
            setShowPassword(!showPassword);
          },
        },
        secureTextEntry: !showPassword,
      }}
      {...props}
    />
  );
}
