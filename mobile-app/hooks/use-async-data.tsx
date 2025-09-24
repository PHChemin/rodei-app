import { Log } from "@/services/logger";
import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import Constants from "expo-constants";
import {
  Stack,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { t } from "i18next";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { ZodError } from "zod";

export function useAsyncData<T>(
  onLoad: () => Promise<T>,
  deps?: React.DependencyList
) {
  const [data, setData] = useState<{ content?: T; loading: ReactNode | null }>({
    content: undefined,
    loading: <AsyncDataLoading />,
  });

  const refresh = async (withLoading = true) => {
    try {
      if (withLoading) {
        setData({
          content: undefined,
          loading: <AsyncDataLoading />,
        });
      }

      const content = await onLoad();

      setData({ content, loading: null });
    } catch (error) {
      setData({
        content: undefined,
        loading: <AsyncDataLoading hasError={error} />,
      });
    }
  };
  // onLoad()
  //   .then((content) => {
  //     Log.i("refreshing...");
  //     setData({ content, loading: null });
  //   })
  //   .catch((error) =>
  //     setData({
  //       content: undefined,
  //       loading: <AsyncDataLoading hasError={error} />,
  //     })
  //   );

  useEffect(() => {
    refresh();
  }, deps || []);

  return { ...(data.content as T), loading: data.loading, refresh };
}

type LoadingProps = {
  hasError?: any;
};

const AsyncDataLoading = ({ hasError }: LoadingProps) => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const { theme } = useTheme();
  const styles = useStyles();
  const pathname = usePathname();

  if (hasError) {
    if (process.env.EXPO_PUBLIC_LOG_USEASYNCDATA_ERRORS) {
      Log.e(hasError);
    }

    return (
      <>
        <View style={styles.container}>
          <Text>{t("components.error.title")}</Text>

          <Text style={{ textAlign: "justify" }}>
            {t("components.error.message")}
          </Text>

          <Button
            title={t("buttons.return-back")}
            onPress={() => {
              router.back();
            }}
          />

          <Button
            type="clear"
            title={t("buttons.return-start")}
            onPress={() => {
              // optionally clean user token here. this can avoid a redirect loop
              router.replace("/");
            }}
          />

          {process.env.EXPO_PUBLIC_LOG_USEASYNCDATA_ERRORS && (
            <ScrollView>
              <Text>Pathname: {pathname}</Text>
              <Text>
                useGlobalSearchParams: {JSON.stringify(params, null, 2)}
              </Text>

              {hasError instanceof ZodError ? (
                <>
                  <Text>Erros zod: {hasError.errors.length}</Text>
                  <Text>{JSON.stringify(hasError.format(), null, 2)}</Text>
                </>
              ) : (
                <>
                  <Text>Error: {JSON.stringify(hasError, null, 2)}</Text>
                </>
              )}
            </ScrollView>
          )}
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
}));
