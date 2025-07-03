import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCache } from "@/hooks/use-cache";
import { TruckBase } from "@/schemas";
import { api, handleFormErrors } from "@/services";

import { SelectInput, TextInput } from "@/components/ui";

import { colorOptions, truckBrandOptions } from "./_helper";

type EditTruckFormProps = {
  fleetId: number;
  truckId: number;
};

export function EditTruckForm({ fleetId, truckId }: EditTruckFormProps) {
  const { cached, invalidate } = useCache();

  const truck = TruckBase.parse(cached("truck"));

  const [brandName, setBrandName] = useState(truck.brand_name);
  const [model, setModel] = useState(truck.model);
  const [licensePlate, setLicensePlate] = useState(truck.license_plate);
  const [color, setColor] = useState(truck.color);
  const [commisionPercentage, setCommisionPercentage] = useState(
    truck.commission_percentage.toString()
  );

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleEditTruck = async () => {
    try {
      await api().put(`/fleets/${fleetId}/trucks/${truckId}`, {
        brand_name: brandName,
        model: model,
        license_plate: licensePlate,
        color: color,
        commission_percentage: parseFloat(commisionPercentage),
      });

      invalidate("truck");

      router.dismissAll();
      router.push(`/manager/fleets/${fleetId}/trucks/${truckId}/details`);
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

      <Button title={t("buttons.edit")} onPress={handleEditTruck} />
    </>
  );
}
