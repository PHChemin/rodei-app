import { Text } from "@rneui/themed";

import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";
import { t } from "i18next";

export function EmpityHistoryMessage() {
  return (
    <Flex direction="column" justify="center" gap={spacing.sm}>
      <Text h4>{t("components.freight-history.empty-title")}</Text>

      <Text>{t("components.freight-history.empty-message")}</Text>
    </Flex>
  );
}
