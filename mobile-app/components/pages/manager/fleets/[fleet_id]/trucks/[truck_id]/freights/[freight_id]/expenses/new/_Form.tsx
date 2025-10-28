import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { api, handleFormErrors } from "@/services";
import { parseCurrency } from "@/services/helpers/currency/currencyFormatter";
import { formatToApiDate } from "@/services/helpers/date/date";
import { maskCurrency, maskDate } from "@/services/masks";
import { colors } from "@/services/theme/constants";

import { SelectInput, TextInput } from "@/components/ui";

import { expenseTypesOptions } from "./_Helper";

type AddExpenseFormProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function AddExpenseForm({
  fleetId,
  truckId,
  freightId,
}: AddExpenseFormProps) {
  const styles = useStyles();

  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleCreateExpense = async () => {
    try {
      const formattedDate = formatToApiDate(date);
      const formattedAmount = parseCurrency(amount);

      await api().post(
        `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/expenses`,
        {
          type: type,
          location: location,
          amount: formattedAmount,
          date: formattedDate,
          description: description,
        }
      );

      router.replace(
        `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/details`
      );
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <>
      <SelectInput
        label={t("fields.type")}
        value={type}
        onChange={setType}
        data={expenseTypesOptions}
        required
        errorMessage={errors.type?.message?.toString()}
      />

      <TextInput
        label={t("fields.location")}
        value={location}
        onChangeText={setLocation}
        required
        inputProps={{
          rightIcon: {
            type: "material-community",
            name: "map-marker",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.location?.message?.toString()}
      />

      <TextInput
        label={t("fields.amount")}
        value={amount}
        onChangeText={(text) => setAmount(maskCurrency(text))}
        required
        inputProps={{
          keyboardType: "numeric",
          rightIcon: {
            type: "material-community",
            name: "currency-brl",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.amount?.message?.toString()}
      />

      <TextInput
        label={t("fields.date")}
        value={date}
        onChangeText={(text) => setDate(maskDate(text))}
        required
        inputProps={{
          keyboardType: "numeric",
          rightIcon: {
            type: "material-community",
            name: "calendar",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.date?.message?.toString()}
      />

      <TextInput
        label={t("fields.description")}
        value={description}
        onChangeText={setDescription}
        inputProps={{
          rightIcon: {
            type: "material-community",
            name: "clipboard-text",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.description?.message?.toString()}
      />

      <Button title={t("buttons.report")} onPress={handleCreateExpense} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
