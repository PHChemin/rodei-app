import { makeStyles, Text } from "@rneui/themed";

import { Flex } from "@/components/ui";
import { spacing } from "@/services/theme/constants";

type EmpityMessageProps = {};

export function EmpityMessage({}: EmpityMessageProps) {
  const styles = useStyles();

  return (
    <Flex direction="column" justify="center" gap={spacing.sm}>
      <Text h4>Nenhuma frota cadastrada!</Text>

      <Text>Clique em criar frota para começar</Text>
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({}));
