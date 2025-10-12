import { Button, makeStyles } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { useCache } from "@/hooks/use-cache";
import { FreightDetailsSchema } from "@/schemas";
import { api, handleFormErrors } from "@/services";
import { parseCurrency } from "@/services/helpers/currency/currencyFormatter";
import {
  formatToApiDate,
  formatToDisplayDate,
} from "@/services/helpers/date/date";
import { maskCurrency, maskDate } from "@/services/masks";
import { colors } from "@/services/theme/constants";

import { Flex, TextInput } from "@/components/ui";

type EditFreightFormProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function EditFreightForm({
  fleetId,
  truckId,
  freightId,
}: EditFreightFormProps) {
  const styles = useStyles();
  const { cached, invalidate } = useCache();

  const freight = FreightDetailsSchema.parse(cached("freight"));

  const [startAddress, setStartAddress] = useState(freight.start_address);
  const [endAddress, setEndAddress] = useState(freight.end_address);
  const [contractorName, setContractorName] = useState(freight.contractor_name);
  const [tonPrice, setTonPrice] = useState(freight.ton_price.toString());
  const [cargoWeight, setCargoWeight] = useState(
    freight.cargo_weight.toString()
  );
  const [advancePercentage, setAdvancePercentage] = useState(
    freight.advance_percentage.toString()
  );
  const [date, setDate] = useState(formatToDisplayDate(freight.date));
  const [description, setDescription] = useState(
    freight.description ? freight.description : ""
  );

  const {
    setError,
    formState: { errors },
  } = useForm();

  const handleCreateFreight = async () => {
    try {
      const formattedDate = formatToApiDate(date);
      const formattedTonPrice = parseCurrency(tonPrice);

      await api().put(
        `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}`,
        {
          start_address: startAddress,
          end_address: endAddress,
          contractor_name: contractorName,
          date: formattedDate,
          cargo_weight: Number(cargoWeight),
          ton_price: formattedTonPrice,
          advance_percentage: Number(advancePercentage),
          total_amount: (Number(cargoWeight) / 1000) * Number(tonPrice),
          description: description,
        }
      );

      invalidate("freight");
      router.dismiss(2);
      router.replace(
        `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/details`
      );
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
            onChangeText={(text) => setTonPrice(maskCurrency(text))}
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

      <Button title={t("buttons.save")} onPress={handleCreateFreight} />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "45%",
  },
}));
