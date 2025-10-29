import { makeStyles } from "@rneui/themed";

import { t } from "i18next";

import { useAsyncData } from "@/hooks/use-async-data";
import { FreightDetailsWithExpensesSchema } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { DocumentDetails } from "./_DocumentDetails";
import { ExpensesHisotry } from "./_expenses-history/_ExpensesHistory";
import { FreightDetails } from "./_FreightDetails";

type FreightDetailsScreenProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function FreightDetailsScreen({
  fleetId,
  truckId,
  freightId,
}: FreightDetailsScreenProps) {
  const styles = useStyles();

  const { loading, refresh, freight } = useAsyncData(async () => {
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

      <DocumentDetails freight={freight} refresh={refresh} />

      <ExpensesHisotry
        expenses={freight.expenses}
        fleetId={fleetId}
        truckId={truckId}
        freightId={freightId}
        refresh={refresh}
      />
    </ScreenWrapper.Scrollable>
  );
}

const useStyles = makeStyles((theme) => ({}));
