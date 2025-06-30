import { useGlobalSearchParams } from "expo-router";

import { AddTruckScreen } from "@/components/pages";

export default function _screen() {
  const { id } = useGlobalSearchParams();

  return <AddTruckScreen fleetId={Number(id)} />;
}
