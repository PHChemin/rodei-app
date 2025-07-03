import { Header, ScreenWrapper } from "@/components/ui";
import { makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";
import { Details } from "./_Details";
import { TruckBase } from "@/schemas";
import { useEffect, useState } from "react";
import { api } from "@/services";
import { ActivityIndicator } from "react-native";

type TruckDetailsScreenProps = {
  fleetId: number;
  truckId: number;
};

export function TruckDetailsScreen({
  fleetId,
  truckId,
}: TruckDetailsScreenProps) {
  const styles = useStyles();

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
      <Header.WithTitle title={"Detalhes do Caminhão"} />

      {truck && <Details truck={truck} />}
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
