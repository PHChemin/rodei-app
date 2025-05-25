import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { useState } from "react";

import { TextInput } from "@/components/ui";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!name || cpf.length != 11 || !email || !password || !confirmPassword) {
      return;
    }

    console.log("Registrado");
    router.replace("/");
  };

  return (
    <>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        inputProps={{
          rightIcon: {
            name: "account-outline",
            type: "material-community",
          },
        }}
        required
      />

      <TextInput
        label="CPF"
        value={cpf}
        onChangeText={setCpf}
        inputProps={{
          keyboardType: "numeric",
          rightIcon: {
            name: "badge-account-horizontal-outline",
            type: "material-community",
          },
        }}
        required
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        inputProps={{
          autoCapitalize: "none",
          keyboardType: "email-address",
          rightIcon: {
            name: "email-outline",
            type: "material-community",
          },
        }}
        required
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        inputProps={{
          secureTextEntry: true,
          rightIcon: {
            name: "lock-outline",
            type: "material-community",
          },
        }}
        required
      />

      <TextInput
        label="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        inputProps={{
          secureTextEntry: true,
          rightIcon: {
            name: "lock-outline",
            type: "material-community",
          },
        }}
        required
      />

      <Button title="Registrar" onPress={handleSignUp} />
    </>
  );
}
