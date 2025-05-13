import Flex from "@/components/shared/flex";
import { DEFAULT_PADDING, DEFAULT_RADIUS } from "@/services/theme";
import { Icon, makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type HelpTipProps = {
  title: string;
  tip: string | React.ReactNode;
};
export default function HelpTip({ title, tip }: HelpTipProps) {
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setOpen(!open);
      }}
    >
      <Flex>
        <View style={styles.row}>
          <Text>{title}</Text>
          <Icon type="antdesign" name="questioncircleo" size={20} />
        </View>

        {open && <Text>{tip}</Text>}
      </Flex>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: DEFAULT_PADDING,
    backgroundColor: "#d6eaf8",
    borderRadius: DEFAULT_RADIUS,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
