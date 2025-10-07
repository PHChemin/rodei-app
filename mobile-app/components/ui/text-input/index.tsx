import { Input, InputProps, makeStyles, Text, TextProps } from "@rneui/themed";

import { InputLabel } from "../input-label";

export type TextInputProps = {
  value?: string;
  onChangeText?: (value: string) => void;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  labelProps?: TextProps;
  inputProps?: InputProps;
  required?: boolean;
};

export function TextInput({
  value,
  onChangeText,
  errorMessage,
  label,
  placeholder,
  inputProps,
  required,
  labelProps,
}: TextInputProps) {
  return (
    <>
      {label && (
        <InputLabel {...labelProps}>
          {label} {required && <Text style={{ color: "red" }}>*</Text>}
        </InputLabel>
      )}

      <Input
        value={value}
        onChangeText={onChangeText}
        errorMessage={errorMessage}
        placeholder={placeholder}
        {...inputProps}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
