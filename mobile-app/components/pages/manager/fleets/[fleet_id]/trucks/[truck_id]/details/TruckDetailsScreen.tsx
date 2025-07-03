import { t } from "i18next";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { TruckBase } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { Details } from "./_Details";

type TruckDetailsScreenProps = {
  fleetId: number;
  truckId: number;
};

export function TruckDetailsScreen({
  fleetId,
  truckId,
}: TruckDetailsScreenProps) {
  const [truck, setTruck] = useState<TruckBase>();
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    try {
      setLoading(true);

      const { data } = await api().get(`/fleets/${fleetId}/trucks/${truckId}`);

      const truck = TruckBase.parse(data.data);

      setTruck(truck);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.truck-details.title")} />

      {truck && <Details truck={truck} />}
    </ScreenWrapper.Fullscreen>
  );
}
