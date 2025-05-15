import { makeStyles, Text } from "@rneui/themed";

import { ScreenWrapper } from "@/components/ui";
import { Header } from "@/components/ui/header";

type ManagerScreenProps = {};

export function ManagerScreen({}: ManagerScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title="Manager" />
      <Header.WithMenu />

      <Text>Manager</Text>
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
