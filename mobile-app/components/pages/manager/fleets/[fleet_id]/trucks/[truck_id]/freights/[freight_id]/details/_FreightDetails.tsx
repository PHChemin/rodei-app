import { Card, Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { TouchableOpacity, View } from "react-native";

import { AlertModal, Flex } from "@/components/ui";
import { useAsyncData } from "@/hooks/use-async-data";
import { useCache } from "@/hooks/use-cache";
import useModal from "@/hooks/use-modal";
import { FreightDetailsSchema } from "@/schemas";
import { api } from "@/services";
import { formatToDisplayDate } from "@/services/date/date";
import { colors, iconSize, spacing } from "@/services/theme/constants";

type FreightDetailsProps = {
  fleetId: number;
  truckId: number;
  freightId: number;
};

export function FreightDetails({
  fleetId,
  truckId,
  freightId,
}: FreightDetailsProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { cache } = useCache();

  const { loading, refresh, freight } = useAsyncData(async () => {
    const { data } = await api().get(
      `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}`
    );

    const freight = FreightDetailsSchema.parse(data.data);

    return {
      freight,
    };
  });

  if (loading) return loading;

  const handleEditPress = () => {
    cache("freight", freight);

    router.push(
      `/manager/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}/edit`
    );
  };

  const deleteFreightModal = async () => {
    showModal(
      <AlertModal
        title={t("components.truck-details.delete")}
        message={t("components.truck-details.delete-confirm")}
        confirmButtonTitle={t("buttons.yes")}
        cancelButtonTitle={t("buttons.no")}
        onConfirm={async () => {
          try {
            await api().delete(
              `/fleets/${fleetId}/trucks/${truckId}/freights/${freightId}`
            );

            router.replace(`/manager/fleets/my-fleets`);
          } catch (e) {
            console.log(e);
          } finally {
            hideModal();
          }
        }}
      />
    );
  };

  return (
    <Card>
      <View style={styles.header}>
        <Text h2 numberOfLines={2} adjustsFontSizeToFit={false}>
          {t("components.freight-details.sub-title")}
        </Text>

        <Flex gap={spacing.lg}>
          <TouchableOpacity onPress={handleEditPress}>
            <Icon
              type="material-community"
              name="square-edit-outline"
              size={iconSize.lg}
              color={colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteFreightModal}>
            <Icon
              type="material-community"
              name="trash-can-outline"
              size={iconSize.lg}
              color="red"
            />
          </TouchableOpacity>
        </Flex>
      </View>

      <View style={styles.info}>
        <View style={styles.textContainer}>
          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.start-address")}
            </Text>
            {freight.start_address}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.end-address")}
            </Text>
            {freight.end_address}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.contractor-name")}
            </Text>
            {freight.contractor_name}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.driver")}
            </Text>
            {freight.driver.user.name}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.date")}
            </Text>
            {formatToDisplayDate(freight.date)}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.cargo-weight")}
            </Text>
            {freight.cargo_weight}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.ton-price")}
            </Text>
            R$ {freight.ton_price}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.total-amount")}
            </Text>
            R$ {freight.total_amount}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.advance-percentage")}
            </Text>
            {freight.advance_percentage}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.advance")}
            </Text>
            R$ {freight.advance}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.driver-commission")}
            </Text>
            R$ {freight.driver_commission}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.expenses")}
            </Text>
            R$ {freight.expenses_amount ? freight.expenses_amount : ""}
          </Text>

          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={false}
            style={styles.profit}
            h4
          >
            <Text style={[styles.strong, styles.profit]}>
              {t("components.freight-details.profit")}
            </Text>
            R$ {freight.profit ? freight.profit : ""}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing.md,
  },
  info: {
    flexDirection: "row",
    flexShrink: 1,
    gap: theme.spacing.md,
  },
  textContainer: {
    flexShrink: 1,
  },
  strong: {
    fontWeight: "700",
  },
  profit: {
    color: theme.colors.success,
  },
}));
