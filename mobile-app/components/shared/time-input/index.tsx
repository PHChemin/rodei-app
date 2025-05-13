import { useState } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";

import { Dialog, Text } from "@rneui/themed";
import TimeInputPicker from "./time-input-picker";
import Flex from "@/components/shared/flex";

export type TimeInputValueProps = {
  hour: number;
  minute: number;
};

type TimeInputProps = {
  value: TimeInputValueProps;
  onChange: ({ hour, minute }: TimeInputValueProps) => void;
  label: string;
  dialogTitle: string;
  error?: string;
} & ViewProps;

export default function TimeInput({
  value,
  onChange,
  label,
  dialogTitle,
  error,
  ...rest
}: TimeInputProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  const formattedValue = `${value.hour
    .toString()
    .padStart(2, "0")}:${value.minute.toString().padStart(2, "0")}`;

  return (
    <View {...rest}>
      <Flex direction="row">
        <Text style={{ fontWeight: "bold", marginRight: 8 }}>{label}</Text>

        <TouchableOpacity onPress={() => setPickerVisible((val) => !val)}>
          <Text style={{ fontSize: 16 }}>{formattedValue}</Text>
        </TouchableOpacity>
      </Flex>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Dialog
        isVisible={pickerVisible}
        onBackdropPress={() => setPickerVisible(false)}
      >
        <Dialog.Title title={dialogTitle} />

        <TimeInputPicker
          initialValue={value}
          onChange={(value) => {
            setPickerVisible(false);
            onChange(value);
          }}
        />
      </Dialog>
    </View>
  );
}
