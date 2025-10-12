import { useGlobalSearchParams } from "expo-router";

import { AddFreightScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id } = useGlobalSearchParams();

  return (
    <AddFreightScreen fleetId={Number(fleet_id)} truckId={Number(truck_id)} />
  );
}
