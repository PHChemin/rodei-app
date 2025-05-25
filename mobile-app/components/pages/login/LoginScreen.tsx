import { Button, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";

import useFlashMessages from "@/hooks/use-flash-messages";
import { t } from "@/services/lang";
import { Log } from "@/services/logger";

import { ScreenWrapper, TextInput } from "@/components/ui";

export function LoginScreen() {
  const styles = useStyles();
  const { showFlashMessage } = useFlashMessages();
  const [email, setEmail] = useState("manager@email.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

  // if (pb.authStore.isValid) return <Redirect href="/(auth)/home" />;

  const handleLogin = async () => {
    try {
      if (email == "manager@email.com" && password == "123456") {
        console.log("Logado!");
        router.replace("/(manager)/fleets/my-fleets");
      } else {
        throw new Error("Credenciais inválidas!");
      }
      //   await pb.collection("users").authWithPassword(email, password);
      //   if (router.canDismiss()) {
      //     router.dismissAll();
      //   }
      // router.replace("/(auth)/home");
    } catch (error) {
      Log.pretty(error);
      showFlashMessage({
        type: "error",
        message: t("Credenciais inválidas!"),
      });
    }
  };

  return (
    <ScreenWrapper.Fullscreen center>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.image}
      />

      <TextInput
        placeholder={t("Email")}
        value={email}
        onChangeText={setEmail}
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
        placeholder={t("Senha")}
        value={password}
        onChangeText={setPassword}
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
        title={t("Entrar")}
        onPress={handleLogin}
      />

      <Button
        containerStyle={styles.fullButton}
        type="outline"
        title={t("Registre-se.")}
        // onPress={() => router.push("/sign-up")}
      />

      <Button
        type="clear"
        title={t("Esqueci minha senha")}
        // onPress={() => router.push("/forgot-password")}
      />

      {process.env.EXPO_PUBLIC_EAS_CHANNEL !== "production" && (
        <>
          <Text style={styles.version}>
            [channel: {process.env.EXPO_PUBLIC_EAS_CHANNEL}]
          </Text>
          {/* <Text>[api: {getPbBaseURL()}]</Text> */}
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
