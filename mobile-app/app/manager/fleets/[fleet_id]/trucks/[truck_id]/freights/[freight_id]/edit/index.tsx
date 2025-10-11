import { useGlobalSearchParams } from "expo-router";

import { FreightEditScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id, freight_id } = useGlobalSearchParams();

  return (
    <FreightEditScreen
      fleetId={Number(fleet_id)}
      truckId={Number(truck_id)}
      freightId={Number(freight_id)}
    />
  );
}
