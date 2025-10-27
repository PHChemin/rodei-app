import { SelectInput, TextInput } from "@/components/ui";
import { useCache } from "@/hooks/use-cache";
import { ExpenseBaseSchema } from "@/schemas/Expense/ExpenseBase";
import { api, handleFormErrors } from "@/services";
import {
  formatNumberBRL,
  parseCurrency,
} from "@/services/helpers/currency/currencyFormatter";
import {
  formatToApiDate,
  formatToDisplayDate,
} from "@/services/helpers/date/date";
import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { expenseTypesOptions } from "../../new/_Helper";
import { maskCurrency, maskDate } from "@/services/masks";
import { colors } from "@/services/theme/constants";

type EditExpenseFormProps = {
  fleetId: number;
  truckId: number;
};

export function EditExpenseForm({ fleetId, truckId }: EditExpenseFormProps) {
  const styles = useStyles();
  const { cached, invalidate } = useCache();

  const expense = ExpenseBaseSchema.parse(cached("expense"));

  const [type, setType] = useState(expense.type);
  const [location, setLocation] = useState(expense.location);
  const [amount, setAmount] = useState(
    formatNumberBRL(expense.amount).toString()
  );
  const [date, setDate] = useState(formatToDisplayDate(expense.date));
  const [description, setDescription] = useState(expense.description ?? "");

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleUpdateExpense = async () => {
    const formattedDate = formatToApiDate(date);
    const formattedAmount = parseCurrency(amount);

    try {
      await api().put(
        `/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/expenses/${expense.id}`,
        {
          type: type,
          location: location,
          amount: formattedAmount,
          date: formattedDate,
          description: description,
        }
      );

      invalidate("expense");
      router.dismiss(1);
      router.replace(
        `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${expense.freight_id}/details`
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

      <Button title={t("buttons.save")} onPress={handleUpdateExpense} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({}));
