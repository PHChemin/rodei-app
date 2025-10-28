import { Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { TouchableOpacity, View } from "react-native";

import { useCache } from "@/hooks/use-cache";
import useModal from "@/hooks/use-modal";
import { ExpenseBaseSchema } from "@/schemas/Expense/ExpenseBase";
import { api } from "@/services";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { formatToDisplayDate } from "@/services/helpers/date/date";
import { colors, iconSize, spacing } from "@/services/theme/constants";

import { AlertModal, Flex } from "@/components/ui";

type ExpenseProps = {
  expense: ExpenseBaseSchema;
  fleetId: number;
  truckId: number;
};

export function Expense({ expense, fleetId, truckId }: ExpenseProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { cache } = useCache();

  const handleEditPress = () => {
    cache("expense", expense);

    router.push(
      `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}/edit`
    );
  };

  const deleteExpenseModal = async () => {
    showModal(
      <AlertModal
        title={t("components.expenses-history.delete")}
        message={t("components.expenses-history.delete-confirm")}
        confirmButtonTitle={t("buttons.yes")}
        cancelButtonTitle={t("buttons.no")}
        onConfirm={async () => {
          try {
            await api().delete(
              `/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}`
            );

            router.dismiss(1);
            router.replace(
              `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/details`
            );
          } catch (e) {
            console.log(e);
          } finally {
            hideModal();
          }
        }}
      />
    );
  };

  return (
    <Flex justify="space-between" style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          type="material-community"
          name="clipboard-list-outline"
          color="white"
        />
      </View>

      <View style={styles.textContainer}>
        <Text h4>{expense.type}</Text>

        <Text numberOfLines={2}>{expense.location}</Text>

        <Text>{formatToDisplayDate(expense.date)}</Text>

        <Text style={styles.amount}>
          - R$ {formatNumberBRL(expense.amount)}
        </Text>
      </View>

      <Flex gap={spacing.lg}>
        <TouchableOpacity onPress={handleEditPress}>
          <Icon
            type="material-community"
            name="square-edit-outline"
            size={iconSize.md}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteExpenseModal}>
          <Icon
            type="material-community"
            name="trash-can-outline"
            size={iconSize.lg}
            color="red"
          />
        </TouchableOpacity>
      </Flex>
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
    borderTopWidth: 1,
    borderColor: theme.colors.grey3,
  },
  amount: {
    color: theme.colors.error,
    fontWeight: "bold",
    fontSize: theme.spacing.lg,
  },
  iconContainer: {
    padding: theme.spacing.md,
    borderRadius: 100,
    backgroundColor: theme.colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    fontSize: theme.spacing.lg,
  },
}));
