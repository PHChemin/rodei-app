import { Header, ScreenWrapper } from "@/components/ui";
import { makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";
import { AddExpenseForm } from "./_Form";

type AddExpenseScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function AddExpenseScreen({
  fleetId,
  truckId,
  freightId,
}: AddExpenseScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.expenses-new.title")} />

      <AddExpenseForm
        fleetId={fleetId}
        truckId={truckId}
        freightId={freightId}
      />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
