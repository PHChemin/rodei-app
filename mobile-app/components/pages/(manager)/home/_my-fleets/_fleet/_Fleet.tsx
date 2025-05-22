import { Button, Icon, makeStyles, Text } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

import useFlashMessages from "@/hooks/use-flash-messages";
import useModal from "@/hooks/use-modal";
import { FleetBase } from "@/schemas";
import { t } from "@/services/lang";
import { colors, iconSize, spacing } from "@/services/theme/constants";

import { AlertModal, Flex, InputModal } from "@/components/ui";

import { Truck } from "../_truck/_Truck";

type FleetProps = {
  fleet: FleetBase;
};

export function Fleet({ fleet }: FleetProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { showFlashMessage } = useFlashMessages();

  const editFleetModal = async () => {
    showModal(
      <InputModal
        modalTitle={t("Editar Frota")}
        initialValue={fleet?.name}
        label={t("Nome")}
        minLength={2}
        submitButtonTitle="Confirmar"
        onSubmit={async (name) => {
          try {
            console.log(name);
          } catch (e) {
            showFlashMessage({
              type: "error",
              message: t("Ocorreu um erro ao processar a operação!"),
            });
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
        title={t("Excluir frota")}
        message={t("Você tem certeza que deseja excluir a frota?")}
        confirmButtonTitle={t("Sim")}
        cancelButtonTitle={t("Não")}
        onConfirm={async () => {}}
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
          title="Adicionar caminhão"
          iconRight
          icon={{
            name: "truck",
            type: "feather",
            color: colors.primary,
            size: iconSize.sm,
          }}
          containerStyle={styles.addTruck}
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
