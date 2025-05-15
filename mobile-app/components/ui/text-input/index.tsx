import { Input, InputProps, makeStyles, Text, TextProps } from "@rneui/themed";

import { InputLabel } from "../input-label";

type TextInputProps = {
  value?: string;
  onChangeText?: (value: string) => void;
  label?: string;
  placeholder?: string;
  labelProps?: TextProps;
  inputProps?: InputProps;
  required?: boolean;
};

export function TextInput({
  value,
  onChangeText,
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
        placeholder={placeholder}
        {...inputProps}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
