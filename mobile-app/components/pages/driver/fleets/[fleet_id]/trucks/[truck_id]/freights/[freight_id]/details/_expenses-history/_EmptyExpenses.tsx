import { Text } from "@rneui/themed";
import { t } from "i18next";

import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

export function EmptyExpensesMessage() {
  return (
    <Flex direction="column" justify="center" gap={spacing.sm}>
      <Text h4>{t("components.expenses-history.empty-title")}</Text>

      <Text style={{ textAlign: "center" }}>
        {t("components.expenses-history.empty-message")}
      </Text>
    </Flex>
  );
}
