import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { useAsyncData } from "@/hooks/use-async-data";
import { ManagerFinancialStatement } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { FinanceDetails } from "./_FinanceDetails";

type ManagerFinancialStatementScreenProps = {};

export function ManagerFinancialStatementScreen({}: ManagerFinancialStatementScreenProps) {
  const styles = useStyles();

  const { loading, statement } = useAsyncData(async () => {
    const { data } = await api().get("/manager/finance");

    const statement = ManagerFinancialStatement.parse(data.data);

    return {
      statement,
    };
  });

  if (loading) return loading;

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle
        title={t("components.manager-financial-statement.title")}
      />

      <FinanceDetails statement={statement} />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
