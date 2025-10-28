import { Header, ScreenWrapper } from "@/components/ui";
import { makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";
import { EditExpenseForm } from "./_Form";

type ExpenseEditScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
  expenseId: number;
};

export function ExpenseEditScreen({
  fleetId,
  truckId,
  freightId,
  expenseId,
}: ExpenseEditScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.expenses-edit.title")} />

      <EditExpenseForm fleetId={fleetId} truckId={truckId} />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
