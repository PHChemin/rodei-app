import { Button, Input, makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, Dimensions, Text } from "react-native";

import useModal from "@/hooks/use-modal";
import { t } from "@/services/lang";

import { Flex } from "../flex";

type InputModalProps = {
  onSubmit: (value: string) => void;
  initialValue?: string;
  label?: string;
  modalTitle?: string;
  submitButtonTitle?: string;
  minLength?: number;
};

export function InputModal({
  onSubmit,
  initialValue,
  label,
  modalTitle,
  submitButtonTitle,
  minLength,
}: InputModalProps) {
  const styles = useStyles();
  const { hideModal } = useModal();

  const [value, setValue] = useState(initialValue || "");

  return (
    <Flex style={styles.container}>
      {modalTitle && <Text style={styles.title}>{modalTitle}</Text>}

      <Input label={label} value={value} onChangeText={setValue} />

      <Button
        title={submitButtonTitle || t("OK")}
        onPress={() => {
          if (minLength && value.length < minLength) {
            Alert.alert(
              t("Erro"),
              t(`O campo deve ter pelo menos ${minLength} caracteres!`)
            );
          } else {
            hideModal();
            onSubmit(value);
          }
        }}
      />
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: Dimensions.get("window").width - theme.spacing.xl * 4,
  },
  title: { fontWeight: "bold", textAlign: "center", fontSize: 17 },
}));
