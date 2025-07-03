import { Button, Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { t } from "i18next";
import { TouchableOpacity } from "react-native";

import useModal from "@/hooks/use-modal";
import { FleetWithTrucks } from "@/schemas/Fleet/FleetWithTrucks";
import { api } from "@/services";
import { colors, iconSize, spacing } from "@/services/theme/constants";

import { AlertModal, Flex, InputModal } from "@/components/ui";

import { Truck } from "../_truck/_Truck";

type FleetProps = {
  fleet: FleetWithTrucks;
};

export function Fleet({ fleet }: FleetProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();

  const editFleetModal = async () => {
    showModal(
      <InputModal
        modalTitle={t("components.my-fleets.edit")}
        initialValue={fleet.name}
        label={t("components.my-fleets.name")}
        minLength={2}
        submitButtonTitle={t("buttons.confirm")}
        onSubmit={async (name) => {
          try {
            await api().put(`/fleets/${fleet.id}`, {
              name: name,
            });

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

  const deleteFleetModal = async () => {
    showModal(
      <AlertModal
        title={t("components.my-fleets.delete")}
        message={t("components.my-fleets.delete-confirm")}
        confirmButtonTitle={t("buttons.yes")}
        cancelButtonTitle={t("buttons.no")}
        onConfirm={async () => {
          try {
            await api().delete(`/fleets/${fleet.id}`);

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
    <>
      <Flex justify="space-between">
        <Text h2>{fleet.name}</Text>

        <Flex gap={spacing.xl}>
          <TouchableOpacity onPress={editFleetModal}>
            <Icon
              type="material-community"
              name="square-edit-outline"
              size={iconSize.lg}
              color={colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteFleetModal}>
            <Icon
              type="material-community"
              name="trash-can-outline"
              size={iconSize.lg}
              color="red"
            />
          </TouchableOpacity>
        </Flex>
      </Flex>

      {fleet.trucks.map((truck) => (
        <Truck key={truck.id} truck={truck} />
      ))}

      <Flex justify="center" style={styles.addTruckContainer}>
        <Button
          type="outline"
          size="sm"
          title={t("components.my-fleets.add-truck")}
          iconRight
          icon={{
            name: "truck",
            type: "feather",
            color: colors.primary,
            size: iconSize.sm,
          }}
          containerStyle={styles.addTruck}
          onPress={() => router.push(`/manager/fleets/${fleet.id}/trucks/new`)}
        />
      </Flex>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  addTruckContainer: {
    marginTop: spacing.md,
  },
  addTruck: {
    width: "50%",
  },
}));
