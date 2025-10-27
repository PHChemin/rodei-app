import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { useAsyncData } from "@/hooks/use-async-data";
import { FreightDetailsWithExpensesSchema } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { ExpensesHisotry } from "./_expenses-history/_ExpensesHistory";
import { FreightDetails } from "./_FreightDetails";

type DriverFreightDetailsScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function DriverFreightDetailsScreen({
  fleetId,
  truckId,
  freightId,
}: DriverFreightDetailsScreenProps) {
  const styles = useStyles();

  const { loading, freight } = useAsyncData(async () => {
    const { data } = await api().get(
      `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}`
    );

    const freight = FreightDetailsWithExpensesSchema.parse(data.data);

    return {
      freight,
    };
  });

  if (loading) return loading;

  return (
    <ScreenWrapper.Scrollable>
      <Header.WithTitle title={t("components.freight-details.title")} />

      <FreightDetails freight={freight} />

      <ExpensesHisotry
        expenses={freight.expenses}
        fleetId={fleetId}
        truckId={truckId}
        freightId={freightId}
      />
    </ScreenWrapper.Scrollable>
  );
}

const useStyles = makeStyles((theme) => ({}));
