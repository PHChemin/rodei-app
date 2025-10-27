import { makeStyles } from "@rneui/themed";
import { t } from "i18next";

import { Header, ScreenWrapper } from "@/components/ui";

import { FreightHistory } from "./_FreightHistory";

type DriverFreightHistoryScreenProps = {};

export function DriverFreightHistoryScreen({}: DriverFreightHistoryScreenProps) {
  const styles = useStyles();

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.freight-history.title")} />

      <FreightHistory />
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
