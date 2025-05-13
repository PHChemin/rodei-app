import { Log } from "@/services/logger";
import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import Constants from "expo-constants";
import {
  Stack,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { ZodError } from "zod";
import { t } from "@/services/lang";

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
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
          <Text>{t("Ocorreu um erro ao renderizar o componente!")}</Text>

          <Text style={{ textAlign: "justify" }}>
            {t(
              "Isso pode ter ocorrido por vários motivos, como por exemplo se você tentou acessar um recurso excluído por outro usuário, ou ainda falha de comunicação com o servidor."
            )}
          </Text>

          <Button
            title={t("Retornar à tela anterior")}
            onPress={() => {
              router.back();
            }}
          />

          <Button
            type="clear"
            title={t("Retornar ao Início")}
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
      <Stack.Screen options={{ headerShown: false }} />

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
