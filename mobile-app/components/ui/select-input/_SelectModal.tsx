import { Icon } from "@rneui/base";
import { makeStyles, Text } from "@rneui/themed";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";

import useModal from "@/hooks/use-modal";
import { DEFAULT_RADIUS, iconSize, spacing } from "@/services/theme/constants";

import { Flex } from "../flex";

export type SelectInputItem = {
  label: string;
  value: string;
};

type SelectModalProps = {
  title: string;
  onChange: (value: any) => void;
  data?: SelectInputItem[];
};

export function SelectModal({ title, onChange, data }: SelectModalProps) {
  const styles = useStyles();
  const { hideModal } = useModal();

  return (
    <Flex direction="column" gap={spacing.lg} style={styles.container}>
      <Flex style={{ width: "100%" }} justify="space-between">
        <Text h3>{title}</Text>

        <TouchableOpacity onPress={hideModal}>
          <Icon type="material" name="close" size={iconSize.lg} />
        </TouchableOpacity>
      </Flex>

      <ScrollView style={styles.itemContainer}>
        {data?.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={styles.item}
            activeOpacity={0.6}
            onPress={() => {
              onChange(item.value);
              hideModal();
            }}
          >
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: Dimensions.get("window").width - theme.spacing.xl * 3,
  },
  itemContainer: {
    width: "100%",
    maxHeight: Dimensions.get("window").height * 0.5,
    borderWidth: 1,
    borderRadius: DEFAULT_RADIUS,
    borderColor: theme.colors.grey3,
  },
  item: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey4,
  },
  itemText: {
    textAlign: "center",
  },
}));
