import { Text } from "@rneui/themed";

import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";
import { t } from "i18next";

export function EmpityMessage() {
  return (
    <Flex direction="column" justify="center" gap={spacing.sm}>
      <Text h4>{t("components.my-fleets.empty-title")}</Text>

      <Text>{t("components.my-fleets.empty-message")}</Text>
    </Flex>
  );
}
