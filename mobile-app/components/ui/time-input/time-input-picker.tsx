import { Button, Input, makeStyles, Text } from "@rneui/themed";
import { useState } from "react";

import { TimeInputValueProps } from ".";
import { Flex } from "../flex";

type TimeInputPickerProps = {
  onChange: (value: TimeInputValueProps) => void;
  initialValue: TimeInputValueProps;
};

export default function TimeInputPicker({
  onChange,
  initialValue,
}: TimeInputPickerProps) {
  const styles = useStyles();

  const [hour, setHour] = useState(initialValue.hour);
  const [minute, setMinute] = useState(initialValue.minute);

  const handleChange = () => {
    let val = {
      hour,
      minute,
    };

    if (isNaN(val.hour)) {
      val.hour = 0;
    }

    if (isNaN(val.minute)) {
      val.minute = 0;
    }

    onChange({ hour, minute });
  };

  return (
    <Flex>
      <Flex
        direction="row"
        align="center"
        justify="center"
        gap={0}
        style={{ marginTop: 16 }}
      >
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          keyboardType="number-pad"
          value={hour.toString().padStart(2, "0")}
          onChangeText={(val) => clampSet(val, 0, 23, setHour)}
        />

        <Text style={styles.divider}>:</Text>

        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          keyboardType="number-pad"
          value={minute.toString().padStart(2, "0")}
          onChangeText={(val) => clampSet(val, 0, 59, setMinute)}
        />
      </Flex>

      <Button title="OK" onPress={handleChange} />
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: "40%",
    borderWidth: 0,
  },
  inputStyle: {
    textAlign: "center",
  },
  divider: {
    fontSize: 28,
    paddingBottom: 16,
    marginHorizontal: -20,
  },
}));

const clampSet = (
  val: string,
  start: number,
  end: number,
  setter: (val: number) => void
) => {
  let rangedVal = parseInt(val);
  if (rangedVal > end) rangedVal = end;
  if (rangedVal < start) rangedVal = start;
  setter(rangedVal);
};
