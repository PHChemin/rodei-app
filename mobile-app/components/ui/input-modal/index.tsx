import {
  Button,
  Icon,
  Input,
  InputProps,
  makeStyles,
  Text,
} from "@rneui/themed";
import { t } from "i18next";
import React, { useState } from "react";
import { Alert, Dimensions, TouchableOpacity } from "react-native";

import useModal from "@/hooks/use-modal";

import { iconSize } from "@/services/theme/constants";
import { Flex } from "../flex";

type InputModalProps = {
  onSubmit: (value: string) => void;
  initialValue?: string;
  label?: string;
  modalTitle?: string;
  submitButtonTitle?: string;
  minLength?: number;
  withCloseButton?: boolean;
  mask?: (text: string) => string;
  errorMessage?: string;
  inputProps?: InputProps;
};

export function InputModal({
  onSubmit,
  initialValue,
  label,
  modalTitle,
  submitButtonTitle,
  minLength,
  withCloseButton = true,
  mask,
  inputProps,
}: InputModalProps) {
  const styles = useStyles();
  const { hideModal } = useModal();

  const [value, setValue] = useState(initialValue || "");

  const handleChangeText = (text: string) => {
    if (mask) setValue(mask(text));
    else setValue(text);
  };

  return (
    <Flex direction="column" style={styles.container}>
      <Flex style={{ width: "100%" }} justify="space-between">
        {modalTitle && (
          <Text h3 style={styles.title}>
            {modalTitle}
          </Text>
        )}

        {withCloseButton && (
          <TouchableOpacity onPress={hideModal}>
            <Icon type="material" name="close" size={iconSize.lg} />
          </TouchableOpacity>
        )}
      </Flex>

      <Input
        label={label}
        value={value}
        onChangeText={handleChangeText}
        {...inputProps}
      />

      <Button
        title={submitButtonTitle || t("buttons.ok")}
        onPress={() => {
          if (minLength && value.length < minLength) {
            Alert.alert(
              t("components.input-modal.error"),
              t("components.input-modal.min-length", { count: minLength })
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
    width: Dimensions.get("window").width - theme.spacing.xl * 3,
  },
  title: { fontWeight: "bold" },
}));
