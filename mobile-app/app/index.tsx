import { ScreenWrapper } from "@/components/shared/screen-wrapper";
import useFlashMessages from "@/hooks/use-flash-messages";
import { t } from "@/services/lang";
import { Log } from "@/services/logger";
import { Button, Card, Input, Text } from "@rneui/themed";
import { Redirect, router } from "expo-router";
import { useState } from "react";

export default function _screen() {
  const { showFlashMessage } = useFlashMessages();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if (pb.authStore.isValid) return <Redirect href="/(auth)/home" />;

  const handleLogin = async () => {
    try {
        if(email == "admin" && password == "admin"){
            console.log("Logado!");
        }else {
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
      <Text h1>{process.env.EXPO_PUBLIC_APP_NAME}</Text>

      <Card containerStyle={{ width: "100%" }}>
        <Input
          placeholder={t("Email")}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder={t("Senha")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Button title={t("Login")} onPress={handleLogin} />

        {/* <Button
          style={{ marginTop: 16 }}
          type="clear"
          title={t("Novo por aqui? Registre-se.")}
          onPress={() => router.push("/sign-up")}
        /> */}

        <Button
          style={{ marginTop: 16 }}
          type="clear"
          title={t("Esqueci minha senha")}
          // onPress={() => router.push("/forgot-password")}
        />
      </Card>

      {process.env.EXPO_PUBLIC_EAS_CHANNEL !== "production" && (
        <>
          <Text>[channel: {process.env.EXPO_PUBLIC_EAS_CHANNEL}]</Text>
          {/* <Text>[api: {getPbBaseURL()}]</Text> */}
        </>
      )}
    </ScreenWrapper.Fullscreen>
  );
}
