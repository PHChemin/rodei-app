import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { useAsyncData } from "@/hooks/use-async-data";
import { DriverFinancialStatement, DriverHomeSchema } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { DriverFinancialStatementDetails } from "./_DriverFinanceDetails";
import { DriverInfo } from "./_DriverInfo";
import { EmptyMessage } from "./_EmptyMessage";

type DriverHomeScreenProps = {};

export function DriverHomeScreen({}: DriverHomeScreenProps) {
  const styles = useStyles();

  const { loading, info, statement } = useAsyncData(async () => {
    const { data } = await api().get("/driver");

    const info = DriverHomeSchema.parse(data.data);

    const statmentData = await api().get("/driver/finance");

    const statement = DriverFinancialStatement.parse(statmentData.data.data);

    return {
      info,
      statement,
    };
  });

  if (loading) return loading;

  return (
    <ScreenWrapper.Scrollable>
      <Header.WithTitle title={t("components.driver-home.title")} />
      <Header.WithMenu />

      {info.truck ? (
        <DriverInfo
          driver={info.driver}
          truck={info.truck}
          lastFreight={info.last_freight}
        />
      ) : (
        <EmptyMessage message={t("components.driver-home.empty-truck")} />
      )}

      <DriverFinancialStatementDetails statement={statement} />
    </ScreenWrapper.Scrollable>
  );
}

const useStyles = makeStyles((theme) => ({}));
