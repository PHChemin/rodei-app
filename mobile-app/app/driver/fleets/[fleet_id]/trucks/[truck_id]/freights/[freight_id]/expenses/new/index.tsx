import { useGlobalSearchParams } from "expo-router";

import { DriverAddExpenseScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id, freight_id } = useGlobalSearchParams();

  return (
    <DriverAddExpenseScreen
      fleetId={Number(fleet_id)}
      truckId={Number(truck_id)}
      freightId={Number(freight_id)}
    />
  );
}
