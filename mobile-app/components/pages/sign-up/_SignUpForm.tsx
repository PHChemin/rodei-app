import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TextInput } from "@/components/ui";
import { api, handleFormErrors } from "@/services";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleSubmit = async () => {
    try {
      await api().post("/register", {
        name: name,
        cpf: cpf,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        is_manager: true,
      });

      router.replace("/");
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <>
      <TextInput
        label={t("fields.name")}
        value={name}
        onChangeText={setName}
        errorMessage={errors.name?.message?.toString()}
        inputProps={{
          rightIcon: {
            name: "account-outline",
            type: "material-community",
          },
        }}
        required
      />

      <TextInput
        label={t("fields.cpf")}
        value={cpf}
        onChangeText={setCpf}
        errorMessage={errors.cpf?.message?.toString()}
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
        label={t("fields.email")}
        value={email}
        onChangeText={setEmail}
        errorMessage={errors.email?.message?.toString()}
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
        label={t("fields.password")}
        value={password}
        onChangeText={setPassword}
        errorMessage={errors.password?.message?.toString()}
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
        label={t("fields.confirm-password")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={errors.password_confirmation?.message?.toString()}
        inputProps={{
          secureTextEntry: true,
          rightIcon: {
            name: "lock-outline",
            type: "material-community",
          },
        }}
        required
      />

      <Button title={t("buttons.register")} onPress={handleSubmit} />
    </>
  );
}
