import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { AddFreighForm } from "./_Form";

type AddFreightScreenProps = {
  fleetId: number;
  truckId: number;
};

export function AddFreightScreen({ fleetId, truckId }: AddFreightScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Scrollable>
      <Header.WithTitle title={t("components.freight-add.title")} />

      <AddFreighForm fleetId={fleetId} truckId={truckId} />
    </ScreenWrapper.Scrollable>
  );
}

const useStyles = makeStyles((theme) => ({}));
