import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { FreightHistory } from "./_FreightHistory";

type FreightHistoryScreenProps = {
  fleetId: number;
  truckId: number;
};

export function FreightHistoryScreen({
  fleetId,
  truckId,
}: FreightHistoryScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.freight-history.title")} />

      <FreightHistory fleetId={fleetId} truckId={truckId} />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
