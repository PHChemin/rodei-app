import { Card, Icon, makeStyles, Text } from "@rneui/themed";

import { Flex } from "@/components/ui";
import { UserLogin } from "@/schemas/User/UserLogin";
import { spacing } from "@/services/theme/constants";
import { formatCPF } from "@/services/user/formatCpf";

type UserInfoProps = {
  user: UserLogin;
};

export function UserInfo({ user }: UserInfoProps) {
  const styles = useStyles();

  return (
    <Card>
      <Flex justify="space-between" align="flex-start">
        <Text h1 style={styles.name}>
          {user!.name}
        </Text>

        <Text h4 style={styles.role}>
          {user!.is_manager ? "GESTOR" : "MOTORISTA"}
        </Text>
      </Flex>

      <Flex gap={spacing.md} style={styles.infoContainer}>
        <Icon type="material-community" name="email-outline" />
        <Text>{user!.email}</Text>
      </Flex>

      <Flex gap={spacing.md}>
        <Icon
          type="material-community"
          name="badge-account-horizontal-outline"
        />
        <Text>{formatCPF(user!.cpf)}</Text>
      </Flex>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  role: {
    color: theme.colors.secondary,
  },
  name: {
    flexShrink: 1,
  },
  infoContainer: {
    marginTop: spacing.lg,
  },
}));
