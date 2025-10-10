import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { FreightDetails } from "./_FreightDetails";

type FreightDetailsScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function FreightDetailsScreen({
  fleetId,
  truckId,
  freightId,
}: FreightDetailsScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.freight-details.title")} />

      <FreightDetails
        fleetId={fleetId}
        truckId={truckId}
        freightId={freightId}
      />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
