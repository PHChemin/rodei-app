import { Card, makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";
import { View } from "react-native";

import { FreightDetailsWithExpensesSchema } from "@/schemas";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { formatToDisplayDate } from "@/services/helpers/date/date";

type FreightDetailsProps = {
  freight: FreightDetailsWithExpensesSchema;
};

export function FreightDetails({ freight }: FreightDetailsProps) {
  const styles = useStyles();

  return (
    <Card>
      <Text h2 numberOfLines={2} adjustsFontSizeToFit={false}>
        {t("components.freight-details.sub-title")}
      </Text>

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
              {t("components.freight-details.description")}
            </Text>
            {freight.description}
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

          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={false}
            style={styles.profit}
            h4
          >
            <Text style={[styles.profit, styles.strong]}>
              {t("components.freight-details.driver-commission")}
            </Text>
            R$ {formatNumberBRL(freight.driver_commission)}
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
