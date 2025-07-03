import { useGlobalSearchParams } from "expo-router";

import { TruckDetailsScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id } = useGlobalSearchParams();

  return (
    <TruckDetailsScreen fleetId={Number(fleet_id)} truckId={Number(truck_id)} />
  );
}
