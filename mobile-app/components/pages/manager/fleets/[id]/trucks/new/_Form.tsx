import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";

import { api, handleFormErrors } from "@/services";

import { SelectInput, TextInput } from "@/components/ui";

import { colorOptions, truckBrandOptions } from "./_helper";
import { useForm } from "react-hook-form";

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
      });

      router.dismissAll();
      router.push(`/manager/fleets/my-fleets`);
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
        errorMessage={errors.brand_name?.message?.toString()}
      />

      <TextInput
        label={t("fields.model")}
        value={model}
        onChangeText={setModel}
        errorMessage={errors.model?.message?.toString()}
      />

      <TextInput
        label={t("fields.plate")}
        value={licensePlate}
        onChangeText={setLicensePlate}
        errorMessage={errors.license_plate?.message?.toString()}
      />

      <SelectInput
        label={t("fields.color")}
        value={color}
        onChange={setColor}
        data={colorOptions}
        errorMessage={errors.color?.message?.toString()}
      />

      <TextInput
        label={t("fields.commission-percentage")}
        value={commisionPercentage}
        onChangeText={setCommisionPercentage}
        errorMessage={errors.commission_percentage?.message?.toString()}
      />

      <Button title={t("buttons.add")} onPress={handleCreateTruck} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
