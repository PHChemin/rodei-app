import { Card, Icon, makeStyles, Text } from "@rneui/themed";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { Flex } from "@/components/ui";
import { FreightBase } from "@/schemas";
import { colors, iconSize, spacing } from "@/services/theme/constants";
import { formatToDisplayDate } from "@/services/helpers/date/date";

type FreightProps = {
  freight: FreightBase;
};

export function Freight({ freight }: FreightProps) {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push(
          `/manager/fleets/${freight.fleet_id}/trucks/${freight.truck_id}/freights/${freight.id}/details`
        )
      }
    >
      <Card>
        <Flex justify="space-between" gap={spacing.md}>
          <Flex style={styles.textContainer}>
            <View style={styles.iconContainer}>
              <Icon type="font-awesome-5" name="route" color="white" />
            </View>

            <View style={styles.textContainer}>
              <Flex gap={spacing.sm}>
                <Icon
                  type="material-community"
                  name="map-marker"
                  color={colors.success}
                  style={styles.iconMargin}
                />
                <Text style={styles.textContainer} numberOfLines={2}>
                  {freight.start_address}
                </Text>
              </Flex>

              <Flex gap={spacing.sm}>
                <Icon
                  type="material-community"
                  name="map-marker"
                  color={colors.error}
                  style={styles.iconMargin}
                />
                <Text style={styles.textContainer} numberOfLines={2}>
                  {freight.end_address}
                </Text>
              </Flex>

              <Text>{formatToDisplayDate(freight.date)}</Text>

              <Text>{freight.contractor_name}</Text>
            </View>
          </Flex>

          <Icon
            type="material"
            name="keyboard-arrow-right"
            color={colors.primary}
            size={iconSize.md * 1.5}
          />
        </Flex>
      </Card>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    padding: theme.spacing.lg,
    borderRadius: 100,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconMargin: {
    marginRight: 0,
  },
  container: {
    marginTop: theme.spacing.lg,
  },
  textContainer: {
    flex: 1,
    fontSize: theme.spacing.lg,
  },
}));
