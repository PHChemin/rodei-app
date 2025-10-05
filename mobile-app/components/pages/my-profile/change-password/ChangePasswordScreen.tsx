import { Button, Card } from "@rneui/themed";
import { t } from "i18next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

import { Header, PasswordInput, ScreenWrapper } from "@/components/ui";
import { api, handleFormErrors } from "@/services";
import { logout } from "@/services/user/logout";

export function ChangePasswordScreen() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleSave = () => {
    Alert.alert(
      t("alerts.confirmation"),
      t("alerts.changePassword.confirmChange"),
      [
        { text: t("buttons.cancel"), style: "cancel" },
        {
          text: t("buttons.confirm"),
          onPress: submitSave,
        },
      ]
    );
  };

  const submitSave = async () => {
    try {
      await api().put(`/user/profile/password`, {
        password: password,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });

      logout();
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.change-password.title")} />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        label={t("components.change-password.password")}
        errorMessage={errors.password?.message?.toString()}
      />

      <PasswordInput
        value={newPassword}
        onChangeText={setNewPassword}
        label={t("components.change-password.new-password")}
        errorMessage={errors.new_password?.message?.toString()}
      />

      <PasswordInput
        value={newPasswordConfirmation}
        onChangeText={setNewPasswordConfirmation}
        label={t("components.change-password.confirm-new-password")}
        errorMessage={errors.new_password_confirmation?.message?.toString()}
      />

      <Button title={t("buttons.save")} onPress={handleSave} />
    </ScreenWrapper.Fullscreen>
  );
}
