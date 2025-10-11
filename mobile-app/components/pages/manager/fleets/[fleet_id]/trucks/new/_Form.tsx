import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { api, handleFormErrors } from "@/services";
import { maskCPF } from "@/services/masks";

import { SelectInput, TextInput } from "@/components/ui";

import { colorOptions, truckBrandOptions } from "./_helper";

type AddTruckFormProps = {
  fleetId: number;
};

export function AddTruckForm({ fleetId }: AddTruckFormProps) {
  const styles = useStyles();

  const [brandName, setBrandName] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");
  const [commisionPercentage, setCommisionPercentage] = useState("");
  const [driverCpf, setDriverCpf] = useState("");

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleCreateTruck = async () => {
    try {
      await api().post(`/fleets/${fleetId}/trucks`, {
        brand_name: brandName,
        model: model,
        license_plate: licensePlate,
        color: color,
        commission_percentage: parseFloat(commisionPercentage),
        driver_cpf: driverCpf,
      });

      router.replace("/manager/fleets/my-fleets");
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <>
      <SelectInput
        label={t("fields.brand")}
        value={brandName}
        onChange={setBrandName}
        data={truckBrandOptions}
        required
        errorMessage={errors.brand_name?.message?.toString()}
      />

      <TextInput
        label={t("fields.model")}
        value={model}
        onChangeText={setModel}
        required
        errorMessage={errors.model?.message?.toString()}
      />

      <TextInput
        label={t("fields.plate")}
        value={licensePlate}
        onChangeText={setLicensePlate}
        required
        errorMessage={errors.license_plate?.message?.toString()}
      />

      <SelectInput
        label={t("fields.color")}
        value={color}
        onChange={setColor}
        data={colorOptions}
        required
        errorMessage={errors.color?.message?.toString()}
      />

      <TextInput
        label={t("fields.commission-percentage")}
        value={commisionPercentage}
        onChangeText={setCommisionPercentage}
        required
        errorMessage={errors.commission_percentage?.message?.toString()}
      />

      <TextInput
        label={t("fields.driver-cpf")}
        value={driverCpf}
        onChangeText={(text) => setDriverCpf(maskCPF(text))}
        required
        errorMessage={errors.driver_cpf?.message?.toString()}
      />

      <Button title={t("buttons.add")} onPress={handleCreateTruck} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
