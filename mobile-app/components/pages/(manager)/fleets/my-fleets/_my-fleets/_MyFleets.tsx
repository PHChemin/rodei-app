import { Button, makeStyles, Text } from "@rneui/themed";
import { FlatList, View } from "react-native";

import useFlashMessages from "@/hooks/use-flash-messages";
import { useFleetStore } from "@/hooks/use-fleet-store";
import useModal from "@/hooks/use-modal";
import { FleetBase } from "@/schemas";
import { t } from "@/services/lang";
import { spacing } from "@/services/theme/constants";

import { Flex, InputModal } from "@/components/ui";

import { EmpityMessage } from "./_EmptyMessage";
import { Fleet } from "./_fleet/_Fleet";

type MyFleetsProps = {};

export function MyFleets({}: MyFleetsProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();
  const { showFlashMessage } = useFlashMessages();
  const { list, add } = useFleetStore();

  const createFleetModal = async () => {
    showModal(
      <InputModal
        modalTitle={t("Criar frota")}
        label={t("Nome")}
        minLength={2}
        submitButtonTitle="Confirmar"
        onSubmit={async (name) => {
          try {
            const newFleet: FleetBase = {
              id: list().length,
              name: name,
              trucks: [],
            };
            add(newFleet);
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

  return (
    <>
      <Flex justify="space-between" style={styles.headerContainer}>
        <Text h3 style={styles.greeting}>
          Olá, GESTOR
        </Text>
        <Button
          title="Criar frota"
          size="sm"
          iconRight
          icon={{ name: "add", type: "material", color: "white" }}
          onPress={createFleetModal}
        />
      </Flex>

      <FlatList
        data={list()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Fleet fleet={item} />}
        ListEmptyComponent={() => <EmpityMessage />}
        ItemSeparatorComponent={() => (
          <View style={{ height: spacing.xl * 2 }} />
        )}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    marginBottom: theme.spacing.xl,
  },
  greeting: {
    fontStyle: "italic",
    color: theme.colors.secondary,
  },
}));
