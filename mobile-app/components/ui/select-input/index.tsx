import { Icon, makeStyles, Text } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";

import useModal from "@/hooks/use-modal";
import { colors } from "@/services/theme/constants";

import { InputLabel } from "../input-label";
import { SelectInputItem, SelectModal } from "./_SelectModal";

type SelectInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  data?: SelectInputItem[];
  errorMessage?: string;
};

export function SelectInput({
  label,
  value,
  onChange,
  data,
  errorMessage,
}: SelectInputProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();

  const selectModal = async () => {
    showModal(
      <SelectModal title="Selecione" data={data} onChange={onChange} />
    );
  };

  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}

      <TouchableOpacity onPress={selectModal}>
        <View style={styles.inputContainer}>
          <View style={styles.infoContainer}>
            {value ? (
              <Text h4 h4Style={styles.inputText}>
                {value}
              </Text>
            ) : (
              <Text h4 h4Style={styles.placeholderText}>
                Selecione
              </Text>
            )}
          </View>

          <Icon
            name="chevron-down"
            type="material-community"
            color={colors.secondary}
          />
        </View>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    marginHorizontal: theme.spacing.md,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: theme.colors.grey3,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  infoContainer: {
    flex: 1,
  },
  inputText: {
    fontWeight: "normal",
  },
  placeholderText: {
    color: theme.colors.grey3,
    fontWeight: "normal",
  },
  errorMessage: {
    color: "red",
    marginTop: 0,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.lg,
    fontSize: 12,
  },
}));
