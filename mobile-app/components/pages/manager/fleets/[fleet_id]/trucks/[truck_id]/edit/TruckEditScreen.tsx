import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { EditTruckForm } from "./_Form";

type TruckEditScreenProps = {
  fleetId: number;
  truckId: number;
};

export function TruckEditScreen({ fleetId, truckId }: TruckEditScreenProps) {
  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.truck-edit.title")} />

      <EditTruckForm fleetId={fleetId} truckId={truckId} />
    </ScreenWrapper.Fullscreen>
  );
}
