import { useTheme } from "@rneui/themed";
import React, { PropsWithChildren, useCallback } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

type ScrollableProps = {
  padding?: "xs" | "sm" | "md" | "lg" | "xl" | "none";
  onRefresh?: () => Promise<void>;
} & PropsWithChildren;

export default function Scrollable({
  children,
  padding = "xl",
  onRefresh,
}: ScrollableProps) {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefreshWrapper = useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <View
      style={[
        styles.container,
        padding !== "none" && { padding: theme.spacing[padding] },
      ]}
    >
      <ScrollView
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshWrapper}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
