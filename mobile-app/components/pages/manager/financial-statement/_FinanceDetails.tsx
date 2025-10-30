import { Card, makeStyles, Text } from "@rneui/themed";
import dayjs from "dayjs";
import { t } from "i18next";

import { ManagerFinancialStatement } from "@/schemas";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

type FinanceDetailsProps = {
  statement: ManagerFinancialStatement;
};

export function FinanceDetails({ statement }: FinanceDetailsProps) {
  const styles = useStyles();

  return (
    <>
      <Flex justify="space-between" gap={spacing.md}>
        <Card containerStyle={styles.card}>
          <Text style={styles.subtitle}>
            {t("components.manager-financial-statement.freights")}
          </Text>
          <Text style={styles.text}>{statement.freights_count}</Text>
        </Card>

        <Card containerStyle={styles.card}>
          <Text style={styles.subtitle}>
            {t("components.manager-financial-statement.expenses")}
          </Text>
          <Text style={styles.text}>{statement.expenses_count}</Text>
        </Card>
      </Flex>

      <Flex justify="space-between" gap={spacing.md}>
        <Card containerStyle={styles.card}>
          <Text style={styles.subtitle}>
            {t("components.manager-financial-statement.revenue")}
          </Text>
          <Text style={[styles.text, styles.profit]}>
            R$ {formatNumberBRL(statement.total_revenue)}
          </Text>
        </Card>

        <Card containerStyle={styles.card}>
          <Text style={styles.subtitle}>
            {t("components.manager-financial-statement.costs")}
          </Text>
          <Text style={[styles.text, styles.expense]}>
            R$ {formatNumberBRL(statement.total_expenses)}
          </Text>
        </Card>
      </Flex>

      <Card containerStyle={{ marginBottom: spacing.md }}>
        <Text style={styles.subtitle}>
          {t("components.manager-financial-statement.profit")}
        </Text>
        <Text
          style={[
            styles.text,
            statement.total_profit >= 0 ? styles.profit : styles.expense,
          ]}
        >
          R$ {formatNumberBRL(statement.total_profit)}
        </Text>
      </Card>

      <Card>
        <Text style={styles.subtitle}>
          {t("components.manager-financial-statement.profit-last-month") +
            ` (${dayjs().subtract(1, "month").format("MM/YYYY")})`}
        </Text>
        <Text
          style={[
            styles.text,
            statement.last_month_profit >= 0 ? styles.profit : styles.expense,
          ]}
        >
          R$ {formatNumberBRL(statement.last_month_profit)}
        </Text>
      </Card>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontSize: theme.spacing.md * 2,
    textAlign: "center",
  },
  text: {
    fontSize: theme.spacing.lg * 1.5,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: theme.spacing.sm,
  },
  profit: {
    color: theme.colors.success,
  },
  expense: {
    color: theme.colors.error,
  },
  card: {
    flex: 1,
    marginBottom: theme.spacing.md,
  },
}));
