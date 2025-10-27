import { useGlobalSearchParams } from "expo-router";

import { ExpenseEditScreen } from "@/components/pages";

export default function _screen() {
  const { fleet_id, truck_id, freight_id, expense_id } =
    useGlobalSearchParams();

  return (
    <ExpenseEditScreen
      fleetId={Number(fleet_id)}
      truckId={Number(truck_id)}
      freightId={Number(freight_id)}
      expenseId={Number(expense_id)}
    />
  );
}
