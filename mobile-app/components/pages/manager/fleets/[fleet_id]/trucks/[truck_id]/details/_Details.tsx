import { Card, Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { Image, TouchableOpacity, View } from "react-native";

import useModal from "@/hooks/use-modal";
import { TruckBase } from "@/schemas";
import { api } from "@/services";
import { colors, iconSize, spacing } from "@/services/theme/constants";
import { getTruckBrandImage } from "@/services/truck-brand-images";

import { AlertModal, Flex, TextIcon } from "@/components/ui";
import { useCache } from "@/hooks/use-cache";

type DetailsProps = {
  truck: TruckBase;
};

export function Details({ truck }: DetailsProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  //   const {cache} = useCache();

  //   const handleEditPress = () => {
  //     cache('truck', truck);

  //     router.push(`/manager/fleets/${truck.fleet_id}/trucks/${truck.id}/edit`);
  //   };

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
      <Flex justify="space-between" align="flex-start">
        <Flex>
          <Image
            source={getTruckBrandImage(truck.brand_name)}
            style={styles.image}
          />

          <View>
            <Text h2>
              {truck.brand_name} {truck.model}
            </Text>
            <Text>{truck.license_plate}</Text>
          </View>
        </Flex>

        <Flex>
          <Flex gap={spacing.lg}>
            <TouchableOpacity onPress={() => {}}>
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
        </Flex>
      </Flex>

      <TextIcon
        text="Motorista Exemplo"
        iconType="material-community"
        iconName="steering"
      />

      <TextIcon
        text="000.000.000-00"
        iconType="material-community"
        iconName="card-account-details-outline"
      />

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
}));
