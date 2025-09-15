import { t } from "i18next";
import { ActivityIndicator } from "react-native";

import { TruckBase } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { useAsyncData } from "@/hooks/use-async-data";
import { Details } from "./_Details";

type TruckDetailsScreenProps = {
  fleetId: number;
  truckId: number;
};

export function TruckDetailsScreen({
  fleetId,
  truckId,
}: TruckDetailsScreenProps) {
  const { loading, truck } = useAsyncData(async () => {
    const { data } = await api().get(`/fleets/${fleetId}/trucks/${truckId}`);

    const truck = TruckBase.parse(data.data);

    return { truck };
  }, []);

  if (loading) return loading;

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.truck-details.title")} />

      <Details truck={truck} />
    </ScreenWrapper.Fullscreen>
  );
}
