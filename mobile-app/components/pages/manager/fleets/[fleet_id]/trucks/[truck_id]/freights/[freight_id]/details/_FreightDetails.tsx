import { Button, Card, Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useCache } from "@/hooks/use-cache";
import useModal from "@/hooks/use-modal";
import { FreightDetailsWithExpensesSchema } from "@/schemas";
import { api } from "@/services";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { formatToDisplayDate } from "@/services/helpers/date/date";
import { colors, iconSize, spacing } from "@/services/theme/constants";

import { AlertModal, Flex } from "@/components/ui";

type FreightDetailsProps = {
  freight: FreightDetailsWithExpensesSchema;
};

export function FreightDetails({ freight }: FreightDetailsProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { cache } = useCache();

  const [showMore, setShowMore] = useState(false);

  const handleEditPress = () => {
    cache("freight", freight);

    router.push(
      `/manager/fleets/${freight.fleet_id}/trucks/${freight.truck_id}/freights/${freight.id}/edit`
    );
  };

  const deleteFreightModal = async () => {
    showModal(
      <AlertModal
        title={t("components.freight-details.delete")}
        message={t("components.freight-details.delete-confirm")}
        confirmButtonTitle={t("buttons.yes")}
        cancelButtonTitle={t("buttons.no")}
        onConfirm={async () => {
          try {
            await api().delete(
              `/fleets/${freight.fleet_id}/trucks/${freight.truck_id}/freights/${freight.id}`
            );

            router.dismiss(2);
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
            R$ {formatNumberBRL(freight.ton_price)}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.total-amount")}
            </Text>
            R$ {formatNumberBRL(freight.total_amount)}
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
            R$ {formatNumberBRL(freight.advance)}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.freight-details.driver-commission")}
            </Text>
            R$ {formatNumberBRL(freight.driver_commission)}
          </Text>

          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={false}
            style={[styles.expense, styles.strong]}
          >
            <Text style={[styles.expense, styles.strong]}>
              {t("components.freight-details.expenses")}
            </Text>
            R$ {formatNumberBRL(freight.expenses_amount)}
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
            R$ {formatNumberBRL(freight.profit)}
          </Text>

          {showMore && (
            <Text adjustsFontSizeToFit={false}>
              <Text style={styles.strong}>
                {t("components.freight-details.description")}
              </Text>
              {freight.description}
            </Text>
          )}
        </View>
      </View>

      <Button
        type="clear"
        title={showMore ? t("buttons.less") : t("buttons.more")}
        iconRight
        icon={{
          name: showMore ? "chevron-up" : "chevron-down",
          type: "material-community",
          color: colors.primary,
          size: iconSize.sm,
        }}
        onPress={() => setShowMore(!showMore)}
      />
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
  expense: {
    color: theme.colors.error,
  },
}));
