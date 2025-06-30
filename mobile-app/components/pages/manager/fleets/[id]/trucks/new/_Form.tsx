import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";

import useFlashMessages from "@/hooks/use-flash-messages";
import { useFleetStore } from "@/hooks/use-fleet-store";
import { TruckBase } from "@/schemas";

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
        message: "Ocorreu um erro ao processar a operação!",
      });
    }
  };

  return (
    <>
      <SelectInput
        label={t("fields.brand")}
        value={brandName}
        onChange={setBrandName}
        data={truckBrandOptions}
      />

      <TextInput
        label={t("fields.model")}
        value={model}
        onChangeText={setModel}
      />

      <TextInput
        label={t("fields.plate")}
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      <SelectInput
        label={t("fields.color")}
        value={color}
        onChange={setColor}
        data={colorOptions}
      />

      <Button title={t("buttons.add")} onPress={handleCreateTruck} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
