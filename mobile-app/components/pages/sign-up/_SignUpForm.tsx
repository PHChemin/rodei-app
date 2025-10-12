import { Button, CheckBox, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { api, handleFormErrors } from "@/services";
import { maskCPF } from "@/services/masks";

import { Flex, InputLabel, TextInput } from "@/components/ui";

export function SignUpForm() {
  const styles = useStyles();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isManager, setIsManager] = useState(true);

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
        is_manager: isManager,
      });

      router.replace("/");
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <>
      <InputLabel>
        {t("fields.role")} {<Text style={{ color: "red" }}>*</Text>}
      </InputLabel>
      <Flex>
        <CheckBox
          title={t("fields.manager")}
          checked={isManager}
          onPress={() => setIsManager(true)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.checkbox}
          textStyle={styles.checkboxText}
        />

        <CheckBox
          title={t("fields.driver")}
          checked={!isManager}
          onPress={() => setIsManager(false)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.checkbox}
          textStyle={styles.checkboxText}
        />
      </Flex>

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
        onChangeText={(text) => setCpf(maskCPF(text))}
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

const useStyles = makeStyles((theme) => ({
  checkbox: {
    backgroundColor: "transparent",
  },
  checkboxText: {
    fontSize: 20,
    fontWeight: "semibold",
  },
}));
