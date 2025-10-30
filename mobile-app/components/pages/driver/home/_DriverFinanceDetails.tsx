import { Card, makeStyles, Text } from "@rneui/themed";
import dayjs from "dayjs";
import { t } from "i18next";

import { DriverFinancialStatement } from "@/schemas";
import { formatNumberBRL } from "@/services/helpers/currency/currencyFormatter";
import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

type DriverFinancialStatementDetailsProps = {
  statement: DriverFinancialStatement;
};

export function DriverFinancialStatementDetails({
  statement,
}: DriverFinancialStatementDetailsProps) {
  const styles = useStyles();

  return (
    <>
      <Text h1>{t("components.driver-financial-statement.title")}</Text>

      <Flex
        justify="space-between"
        gap={spacing.md}
        style={{ marginTop: spacing.sm }}
      >
        <Card containerStyle={styles.card}>
          <Text style={styles.subtitle}>
            {t("components.driver-financial-statement.freights")}
          </Text>
          <Text style={styles.text}>{statement.freights_count}</Text>
        </Card>

        <Card containerStyle={styles.card}>
          <Text style={styles.subtitle}>
            {t("components.driver-financial-statement.commission-percentage")}
          </Text>
          <Text style={styles.text}>
            {statement.commission_percentage + "%"}
          </Text>
        </Card>
      </Flex>

      <Card containerStyle={{ marginBottom: spacing.md }}>
        <Text style={styles.subtitle}>
          {t("components.driver-financial-statement.profit")}
        </Text>
        <Text style={[styles.text, styles.profit]}>
          R$ {formatNumberBRL(statement.total_profit)}
        </Text>
      </Card>

      <Card>
        <Text style={styles.subtitle}>
          {t("components.driver-financial-statement.profit-last-month") +
            ` (${dayjs().subtract(1, "month").format("MM/YYYY")})`}
        </Text>
        <Text style={[styles.text, styles.profit]}>
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
  card: {
    flex: 1,
    marginBottom: theme.spacing.md,
  },
}));
