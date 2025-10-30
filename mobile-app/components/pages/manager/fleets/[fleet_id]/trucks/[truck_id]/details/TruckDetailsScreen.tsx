import { router } from "expo-router";
import { t } from "i18next";

import {
  Header,
  InputModal,
  Menu,
  MenuItem,
  ScreenWrapper,
} from "@/components/ui";
import { useAsyncData } from "@/hooks/use-async-data";
import useModal from "@/hooks/use-modal";
import { TruckFinancialStatement, TruckWithDriver } from "@/schemas";
import { api } from "@/services";
import { maskCPF } from "@/services/masks";

import { Details } from "./_Details";
import { TruckFinancialDetails } from "./_FinanceDetails";

type TruckDetailsScreenProps = {
  fleetId: number;
  truckId: number;
};

export function TruckDetailsScreen({
  fleetId,
  truckId,
}: TruckDetailsScreenProps) {
  const { showModal, hideModal } = useModal();

  const { loading, truck, statement, refresh } = useAsyncData(async () => {
    const { data } = await api().get(`/fleets/${fleetId}/trucks/${truckId}`);

    const statementData = await api().get(
      `/fleets/${fleetId}/trucks/${truckId}/finance`
    );

    const truck = TruckWithDriver.parse(data.data);

    const statement = TruckFinancialStatement.parse(statementData.data.data);

    return { truck, statement };
  }, []);

  if (loading) return loading;

  const changeDriverModal = async () => {
    showModal(
      <InputModal
        modalTitle={t("components.truck-details.change-driver.title")}
        label={t("components.truck-details.change-driver.cpf")}
        minLength={2}
        submitButtonTitle={t("buttons.confirm")}
        mask={maskCPF}
        onSubmit={async (cpf) => {
          try {
            await api().patch(`/fleets/${fleetId}/trucks/${truckId}/driver`, {
              driver_cpf: cpf,
            });

            refresh();
          } catch (error) {
            console.log(error);
          }
        }}
      />
    );
  };

  return (
    <ScreenWrapper.Scrollable>
      <Header.WithTitle title={t("components.truck-details.title")} />

      <Details truck={truck} />

      <Menu>
        <MenuItem
          onPress={() => {
            router.push(
              `/manager/fleets/${truck.fleet_id}/trucks/${truck.id}/freights/new`
            );
          }}
          text={"Adicionar Frete"}
          icon={{ name: "route", type: "font-awesome-5" }}
        />

        <MenuItem
          onPress={() => {
            router.push(
              `/manager/fleets/${truck.fleet_id}/trucks/${truck.id}/freights/history`
            );
          }}
          text={"Historico de fretes"}
          icon={{ name: "clock-outline", type: "material-community" }}
        />

        <MenuItem
          onPress={changeDriverModal}
          text={"Alterar motorista"}
          icon={{ name: "steering", type: "material-community" }}
        />
      </Menu>

      <TruckFinancialDetails statement={statement} />
    </ScreenWrapper.Scrollable>
  );
}
