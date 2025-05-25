import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { useState } from "react";

import useFlashMessages from "@/hooks/use-flash-messages";
import { useFleetStore } from "@/hooks/use-fleet-store";
import { TruckBase } from "@/schemas";
import { t } from "@/services/lang";

import { SelectInput, TextInput } from "@/components/ui";

import { colorOptions, truckBrandOptions } from "./_helper";

type AddTruckFormProps = {
  fleetId: number;
};

export function AddTruckForm({ fleetId }: AddTruckFormProps) {
  const styles = useStyles();
  const { addTruck, get } = useFleetStore();
  const { showFlashMessage } = useFlashMessages();

  const [brandName, setBrandName] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");

  const handleCreateTruck = async () => {
    try {
      if (!brandName || !model || !licensePlate || !color) {
        throw new Error("Todos os campos devem ser preenchidos!");
      }

      const fleet = get(fleetId);

      const newTruck: TruckBase = {
        id: fleet.trucks.length,
        brand_name: brandName,
        model: model,
        license_plate: licensePlate,
        color: color,
        fleet_id: fleetId,
      };

      addTruck(fleetId, newTruck);
      router.back();
    } catch (error) {
      showFlashMessage({
        type: "error",
        message: t("Ocorreu um erro ao processar a operação!"),
      });
    }
  };

  return (
    <>
      <SelectInput
        label="Marca"
        value={brandName}
        onChange={setBrandName}
        data={truckBrandOptions}
      />

      <TextInput label="Modelo" value={model} onChangeText={setModel} />

      <TextInput
        label="Placa"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      <SelectInput
        label="Cor"
        value={color}
        onChange={setColor}
        data={colorOptions}
      />

      <Button title="Adicionar" onPress={handleCreateTruck} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
