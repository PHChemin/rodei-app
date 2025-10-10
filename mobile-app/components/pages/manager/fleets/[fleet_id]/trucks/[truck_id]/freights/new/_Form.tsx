import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { Flex, TextInput } from "@/components/ui";
import { api, handleFormErrors } from "@/services";
import { formatToApiDate } from "@/services/date/date";
import { colors } from "@/services/theme/constants";

type AddFreighFormProps = {
  fleetId: number;
  truckId: number;
};

export function AddFreighForm({ fleetId, truckId }: AddFreighFormProps) {
  const styles = useStyles();

  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [tonPrice, setTonPrice] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [advancePercentage, setAdvancePercentage] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleCreateFreight = async () => {
    try {
      const formattedDate = formatToApiDate(date);
      console.log({
        cargoWeight,
        tonPrice,
        total: (Number(cargoWeight) / 1000) * Number(tonPrice),
      });

      await api().post(`/fleets/${fleetId}/trucks/${truckId}/freights`, {
        start_address: startAddress,
        end_address: endAddress,
        contractor_name: contractorName,
        date: formattedDate,
        cargo_weight: Number(cargoWeight),
        ton_price: Number(tonPrice),
        advance_percentage: Number(advancePercentage),
        total_amount: (Number(cargoWeight) / 1000) * Number(tonPrice),
        description: description,
        fleet_id: fleetId,
        truck_id: truckId,
      });

      router.dismiss();
    } catch (error) {
      handleFormErrors(error, setError);
    }
  };

  return (
    <>
      <TextInput
        label={t("fields.start-address")}
        value={startAddress}
        onChangeText={setStartAddress}
        required
        inputProps={{
          rightIcon: {
            type: "material-community",
            name: "map-marker",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.start_address?.message?.toString()}
      />

      <TextInput
        label={t("fields.end-address")}
        value={endAddress}
        onChangeText={setEndAddress}
        required
        inputProps={{
          rightIcon: {
            type: "material-community",
            name: "map-marker",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.end_address?.message?.toString()}
      />

      <TextInput
        label={t("fields.contractor-name")}
        value={contractorName}
        onChangeText={setContractorName}
        required
        inputProps={{
          rightIcon: {
            type: "material-community",
            name: "account-cash",
            color: colors.secondary,
          },
        }}
        errorMessage={errors.contractor_name?.message?.toString()}
      />

      <Flex>
        <View style={styles.container}>
          <TextInput
            label={t("fields.ton-price")}
            value={tonPrice}
            onChangeText={setTonPrice}
            required
            inputProps={{
              keyboardType: "numeric",
              rightIcon: {
                type: "material-community",
                name: "currency-brl",
                color: colors.secondary,
              },
            }}
            errorMessage={errors.ton_price?.message?.toString()}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            label={t("fields.cargo-weight")}
            value={cargoWeight}
            onChangeText={setCargoWeight}
            required
            inputProps={{
              keyboardType: "numeric",
              rightIcon: {
                type: "material-community",
                name: "weight-kilogram",
                color: colors.secondary,
              },
            }}
            errorMessage={errors.cargo_weight?.message?.toString()}
          />
        </View>
      </Flex>

      <Flex>
        <View style={styles.container}>
          <TextInput
            label={t("fields.advance-percentage")}
            value={advancePercentage}
            onChangeText={setAdvancePercentage}
            required
            inputProps={{
              keyboardType: "numeric",
              rightIcon: {
                type: "material-community",
                name: "percent",
                color: colors.secondary,
              },
            }}
            errorMessage={errors.advance_percentage?.message?.toString()}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            label={t("fields.date")}
            value={date}
            onChangeText={setDate}
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
        </View>
      </Flex>

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

      <Button title={t("buttons.add")} onPress={handleCreateFreight} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "45%",
  },
}));
