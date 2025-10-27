import { makeStyles, Text } from "@rneui/themed";
import { t } from "i18next";

import { useAsyncData } from "@/hooks/use-async-data";
import { DriverHomeSchema } from "@/schemas";
import { api } from "@/services";

import { Header, ScreenWrapper } from "@/components/ui";

import { DriverInfo } from "./_DriverInfo";
import { EmptyMessage } from "./_EmptyMessage";

type DriverHomeScreenProps = {};

export function DriverHomeScreen({}: DriverHomeScreenProps) {
  const styles = useStyles();

  const { loading, info } = useAsyncData(async () => {
    const { data } = await api().get("/driver");

    const info = DriverHomeSchema.parse(data.data);

    return {
      info,
    };
  });

  if (loading) return loading;

  return (
    <ScreenWrapper.Fullscreen>
      <Header.WithTitle title={t("components.driver-home.title")} />
      <Header.WithMenu />

      {info.truck ? (
        <DriverInfo
          driver={info.driver}
          truck={info.truck}
          lastFreight={info.last_freight}
        />
      ) : (
        <EmptyMessage message={t("components.driver-home.empty-truck")} />
      )}
    </ScreenWrapper.Fullscreen>
  );
}

const useStyles = makeStyles((theme) => ({}));
