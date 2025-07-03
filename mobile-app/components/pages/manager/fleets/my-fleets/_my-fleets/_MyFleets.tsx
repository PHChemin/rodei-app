import { Button, makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { z } from "zod";

import useModal from "@/hooks/use-modal";
import { FleetWithTrucks } from "@/schemas/Fleet/FleetWithTrucks";
import { api } from "@/services";
import { spacing } from "@/services/theme/constants";

import { Flex, InputModal } from "@/components/ui";

import { EmpityMessage } from "./_EmptyMessage";
import { Fleet } from "./_fleet/_Fleet";

type MyFleetsProps = {};

export function MyFleets({}: MyFleetsProps) {
  const styles = useStyles();
  const { showModal, hideModal } = useModal();

  const [fleets, setFleets] = useState<FleetWithTrucks[]>([]);

  const handleMyFleets = async () => {
    const { data } = await api().get("/fleets");

    const fleets = z.array(FleetWithTrucks).parse(data.data);

    setFleets(fleets);
  };

  useEffect(() => {
    handleMyFleets();
  }, []);

  const createFleetModal = async () => {
    showModal(
      <InputModal
        modalTitle={t("components.my-fleets.add")}
        label={t("components.my-fleets.name")}
        minLength={2}
        submitButtonTitle={t("buttons.confirm")}
        onSubmit={async (name) => {
          try {
            await api().post("/fleets", {
              name: name,
            });

            await handleMyFleets();
          } catch (error) {
            console.log(error);
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
          title={t("components.my-fleets.add")}
          size="sm"
          iconRight
          icon={{ name: "add", type: "material", color: "white" }}
          onPress={createFleetModal}
        />
      </Flex>

      <FlatList
        data={fleets}
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
