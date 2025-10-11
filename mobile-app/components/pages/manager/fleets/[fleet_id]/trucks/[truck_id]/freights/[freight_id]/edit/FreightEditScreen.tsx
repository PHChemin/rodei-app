import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { EditFreightForm } from "./_Form";

type FreightEditScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function FreightEditScreen({
  fleetId,
  truckId,
  freightId,
}: FreightEditScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Scrollable>
      <Header.WithTitle title={t("components.freight-edit.title")} />

      <EditFreightForm
        fleetId={fleetId}
        truckId={truckId}
        freightId={freightId}
      />
    </ScreenWrapper.Scrollable>
  );
}

const useStyles = makeStyles((theme) => ({}));
