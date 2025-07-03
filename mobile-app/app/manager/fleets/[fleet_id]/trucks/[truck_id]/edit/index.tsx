import { useGlobalSearchParams } from "expo-router";

import { TruckEditScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id } = useGlobalSearchParams();

  return (
    <TruckEditScreen fleetId={Number(fleet_id)} truckId={Number(truck_id)} />
  );
}
