import { Button, makeStyles, Text } from "@rneui/themed";
import { Redirect, router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image } from "react-native";

import { ScreenWrapper, TextInput } from "@/components/ui";
import { useToken } from "@/hooks/use-token";
import { UserLogin } from "@/schemas/User/UserLogin";
import { api, handleFormErrors } from "@/services";

export function LoginScreen() {
  const styles = useStyles();
  const { token, setToken } = useToken();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await api({ flashSuccess: false }).post("/login", {
        email: email,
        password: password,
      });

      const user = UserLogin.parse(data.user);

      setToken(data.token, user);

      if (user.is_manager) {
        router.push("/manager/fleets/my-fleets");
      } else {
        // router.push("/driver/home");
      }
    } catch (error) {
      handleFormErrors(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  if (token) return <Redirect href="/manager/fleets/my-fleets" />;

  return (
    <ScreenWrapper.Fullscreen center>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.image}
      />

      <TextInput
        placeholder={t("fields.email")}
        value={email}
        onChangeText={setEmail}
        errorMessage={errors.email?.message?.toString()}
        inputProps={{
          autoCapitalize: "none",
          keyboardType: "email-address",
          rightIcon: {
            name: "email",
            type: "material-community",
          },
        }}
      />

      <TextInput
        placeholder={t("fields.password")}
        value={password}
        onChangeText={setPassword}
        errorMessage={errors.password?.message?.toString()}
        inputProps={{
          secureTextEntry: !showPassword,
          autoCapitalize: "none",
          rightIcon: {
            name: showPassword ? "eye-off" : "eye",
            type: "material-community",
            onPress: () => {
              setShowPassword(!showPassword);
            },
          },
        }}
      />

      <Button
        containerStyle={styles.fullButton}
        title={t("buttons.login")}
        onPress={handleLogin}
        loading={isLoading}
      />

      <Button
        containerStyle={styles.fullButton}
        type="outline"
        title={t("buttons.sign-up")}
        onPress={() => router.push("/sign-up")}
      />

      <Button
        type="clear"
        title={t("buttons.forget-password")}
        // onPress={() => router.push("/forgot-password")}
      />

      {process.env.EXPO_PUBLIC_EAS_CHANNEL !== "production" && (
        <>
          <Text style={styles.version}>
            [channel: {process.env.EXPO_PUBLIC_EAS_CHANNEL}] [API:{" "}
            {process.env.EXPO_PUBLIC_API_BASE_URL}]
          </Text>
        </>
      )}
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: 300,
    objectFit: "contain",
    marginBottom: theme.spacing.xl,
  },
  version: {
    position: "absolute",
    bottom: 0,
    right: theme.spacing.xl,
  },
  fullButton: {
    width: "100%",
  },
}));
