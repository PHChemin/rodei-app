import { useGlobalSearchParams } from "expo-router";

import { DriverFreightDetailsScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id, freight_id } = useGlobalSearchParams();

  return (
    <DriverFreightDetailsScreen
      fleetId={Number(fleet_id)}
      truckId={Number(truck_id)}
      freightId={Number(freight_id)}
    />
  );
}
