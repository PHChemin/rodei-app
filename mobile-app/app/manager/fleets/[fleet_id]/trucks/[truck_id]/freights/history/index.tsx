import { useGlobalSearchParams } from "expo-router";

import { FreightHistoryScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id } = useGlobalSearchParams();

  return (
    <FreightHistoryScreen
      fleetId={Number(fleet_id)}
      truckId={Number(truck_id)}
    />
  );
}
