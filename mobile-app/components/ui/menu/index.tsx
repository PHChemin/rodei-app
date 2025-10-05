import { Card, makeStyles } from "@rneui/themed";
import { t } from "i18next";
import { PropsWithChildren } from "react";

import { colors } from "@/services/theme/constants";
import { logout } from "@/services/user/logout";

import { MenuItem } from "../menu-item";

type ProfileMenuProps = {
  withLogout?: boolean;
} & PropsWithChildren;

export function Menu({ children, withLogout = false }: ProfileMenuProps) {
  const styles = useStyles();

  return (
    <Card containerStyle={styles.card}>
      {children}

      {withLogout && (
        <MenuItem
          icon={{ name: "logout", type: "material-community" }}
          text={t("components.profile.menu.logout")}
          color={colors.error}
          onPress={logout}
        />
      )}
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing.lg,
  },
}));
