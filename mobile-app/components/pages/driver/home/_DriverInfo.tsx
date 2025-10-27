import { Button, Card, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { View } from "react-native";

import { DriverBase, FreightBase, TruckBase } from "@/schemas";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { formatToDisplayDate } from "@/services/helpers/date/date";

import { Flex } from "@/components/ui";
import { EmptyMessage } from "./_EmptyMessage";

type DriverInfoProps = {
  driver: DriverBase;
  truck: TruckBase;
  lastFreight: FreightBase | null;
};

export function DriverInfo({ driver, truck, lastFreight }: DriverInfoProps) {
  const styles = useStyles();

  return (
    <>
      <Flex justify="space-between" style={styles.headerContainer}>
        <Text h3 style={styles.greeting}>
          Olá, MOTORISTA
        </Text>

        {lastFreight && truck && (
          <Button
            title={t("buttons.report-expense")}
            size="sm"
            iconRight
            icon={{
              name: "clipboard-list-outline",
              type: "material-community",
              color: "white",
            }}
            onPress={() => {
              router.push(
                `/driver/fleets/${lastFreight.fleet_id}/trucks/${lastFreight.truck_id}/freights/${lastFreight.id}/expenses/new`
              );
            }}
          />
        )}
      </Flex>

      <Card containerStyle={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text h3>Informações do Caminhão</Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.model")}
            </Text>
            {truck.brand_name} {truck.model}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.plate")}
            </Text>
            {truck.license_plate}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.driver")}
            </Text>
            {driver.user.name}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.commission")}
            </Text>
            {truck.commission_percentage} %
          </Text>
        </View>
      </Card>

      {lastFreight ? (
        <Card containerStyle={styles.cardContainer}>
          <Text h3>Informações do Frete</Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.start-address")}
            </Text>
            {lastFreight.start_address}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.end-address")}
            </Text>
            {lastFreight.end_address}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.contractor-name")}
            </Text>
            {lastFreight.contractor_name}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.date")}
            </Text>
            {formatToDisplayDate(lastFreight.date)}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.cargo-weight")}
            </Text>
            {lastFreight.cargo_weight}
          </Text>

          <Text numberOfLines={2} adjustsFontSizeToFit={false}>
            <Text style={styles.strong}>
              {t("components.driver-home.ton-price")}
            </Text>
            R$ {formatNumberBRL(lastFreight.ton_price)}
          </Text>

          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={false}
            style={styles.profit}
            h4
          >
            <Text style={[styles.profit, styles.strong]}>
              {t("components.driver-home.commission")}
            </Text>
            R$ {formatNumberBRL(lastFreight.driver_commission)}
          </Text>
        </Card>
      ) : (
        <EmptyMessage message={t("components.driver-home.empty-freight")} />
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontStyle: "italic",
    color: theme.colors.secondary,
  },
  cardContainer: {
    marginBottom: theme.spacing.lg,
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
