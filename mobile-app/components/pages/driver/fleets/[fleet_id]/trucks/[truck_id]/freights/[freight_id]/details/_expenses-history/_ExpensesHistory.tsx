import { Button, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";

import { ExpenseBaseSchema } from "@/schemas/Expense/ExpenseBase";

import { Flex } from "@/components/ui";

import { EmptyExpensesMessage } from "./_EmptyExpenses";
import { Expense } from "./_Expense";

type ExpensesHisotryProps = {
  expenses: ExpenseBaseSchema[];
  fleetId: number;
  truckId: number;
  freightId: number;
  refresh: () => void;
};

export function ExpensesHisotry({
  expenses,
  fleetId,
  truckId,
  freightId,
  refresh,
}: ExpensesHisotryProps) {
  const styles = useStyles();

  return (
    <>
      <Flex justify="space-between" style={styles.container}>
        <Text h2>{t("components.expenses-history.title")}</Text>

        <Button
          title={t("buttons.report-expense")}
          size="sm"
          iconRight
          icon={{
            name: "clipboard-list-outline",
            type: "material-community",
            color: "white",
          }}
          onPress={() => {
            router.push(
              `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/expenses/new`
            );
          }}
        />
      </Flex>

      {expenses.length === 0 ? (
        <EmptyExpensesMessage />
      ) : (
        expenses.map((expense) => (
          <Expense
            expense={expense}
            fleetId={fleetId}
            truckId={truckId}
            key={expense.id}
            refresh={refresh}
          />
        ))
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
}));
