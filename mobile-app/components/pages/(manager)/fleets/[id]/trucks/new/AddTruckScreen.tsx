import { makeStyles } from "@rneui/themed";

import { Header, ScreenWrapper } from "@/components/ui";

import { AddTruckForm } from "./_Form";

type AddTruckScreenProps = {
  fleetId: number;
};

export function AddTruckScreen({ fleetId }: AddTruckScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title="Adicionar Caminhão" />

      <AddTruckForm fleetId={fleetId} />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
