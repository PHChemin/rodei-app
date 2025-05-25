import { Text } from "@rneui/themed";

import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

export function EmpityMessage() {
  return (
    <Flex direction="column" justify="center" gap={spacing.sm}>
      <Text h4>Nenhuma frota cadastrada!</Text>

      <Text>Clique em criar frota para começar</Text>
    </Flex>
  );
}
