import { Card, Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { Image, TouchableOpacity, View } from "react-native";

import { useCache } from "@/hooks/use-cache";
import useModal from "@/hooks/use-modal";
import { TruckWithDriver } from "@/schemas";
import { api } from "@/services";
import { colors, iconSize, spacing } from "@/services/theme/constants";
import { getTruckBrandImage } from "@/services/truck-brand-images";

import { AlertModal, Flex, TextIcon } from "@/components/ui";

type DetailsProps = {
  truck: TruckWithDriver;
};

export function Details({ truck }: DetailsProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { cache } = useCache();

  const handleEditPress = () => {
    cache("truck", truck);

    router.push(`/manager/fleets/${truck.fleet_id}/trucks/${truck.id}/edit`);
  };

  const deleteTruckModal = async () => {
    showModal(
      <AlertModal
        title={t("components.truck-details.delete")}
        message={t("components.truck-details.delete-confirm")}
        confirmButtonTitle={t("buttons.yes")}
        cancelButtonTitle={t("buttons.no")}
        onConfirm={async () => {
          try {
            await api().delete(`/fleets/${truck.fleet_id}/trucks/${truck.id}`);

            router.dismissAll();
            router.push(`/manager/fleets/my-fleets`);
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
        <View style={styles.truckInfo}>
          <Image
            source={getTruckBrandImage(truck.brand_name)}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text h2 numberOfLines={2} adjustsFontSizeToFit={false}>
              {truck.brand_name} {truck.model}
            </Text>
            <Text>{truck.license_plate}</Text>
            <Text>{truck.color}</Text>
          </View>
        </View>

        <Flex gap={spacing.lg}>
          <TouchableOpacity onPress={handleEditPress}>
            <Icon
              type="material-community"
              name="square-edit-outline"
              size={iconSize.lg}
              color={colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteTruckModal}>
            <Icon
              type="material-community"
              name="trash-can-outline"
              size={iconSize.lg}
              color="red"
            />
          </TouchableOpacity>
        </Flex>
      </View>
      <TextIcon
        text={truck.driver ? truck.driver?.user.name : "SEM MOTORISTA"}
        iconType="material-community"
        iconName="steering"
      />

      {truck.driver && (
        <TextIcon
          text={truck.driver ? truck.driver?.user.cpf : "CPF Motorista"}
          iconType="material-community"
          iconName="card-account-details-outline"
        />
      )}

      <TextIcon
        text={truck.commission_percentage.toFixed(2).toString()}
        iconType="material-community"
        iconName="percent-outline"
      />
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: 50,
    width: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  truckInfo: {
    flexDirection: "row",
    flexShrink: 1,
    gap: spacing.md,
  },
  textContainer: {
    flexShrink: 1,
  },
}));
