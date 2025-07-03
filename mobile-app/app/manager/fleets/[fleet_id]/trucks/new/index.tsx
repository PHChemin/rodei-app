import { useGlobalSearchParams } from "expo-router";

import { AddTruckScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id } = useGlobalSearchParams();

  return <AddTruckScreen fleetId={Number(fleet_id)} />;
}
