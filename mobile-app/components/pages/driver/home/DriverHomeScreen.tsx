import { Header, ScreenWrapper } from "@/components/ui";
import { makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";

type DriverHomeScreenProps = {};

export function DriverHomeScreen({}: DriverHomeScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.driver-home.title")} />
      <Header.WithMenu />

      <Text>Driver Home</Text>
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
