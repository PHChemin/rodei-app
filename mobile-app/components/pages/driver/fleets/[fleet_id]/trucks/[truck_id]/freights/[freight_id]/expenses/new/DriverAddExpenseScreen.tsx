import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { AddExpenseForm } from "./_Form";

type DriverAddExpenseScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function DriverAddExpenseScreen({
  fleetId,
  truckId,
  freightId,
}: DriverAddExpenseScreenProps) {
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
