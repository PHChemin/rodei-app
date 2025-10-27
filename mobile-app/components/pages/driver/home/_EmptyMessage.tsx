import { makeStyles, Text } from "@rneui/themed";

import { spacing } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

type EmptyMessageProps = {
  message: string;
};

export function EmptyMessage({ message }: EmptyMessageProps) {
  const styles = useStyles();

  return (
    <Flex
      direction="column"
      justify="center"
      gap={spacing.sm}
      style={styles.container}
    >
      <Text h4>{message}</Text>
    </Flex>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.lg,
  },
}));
