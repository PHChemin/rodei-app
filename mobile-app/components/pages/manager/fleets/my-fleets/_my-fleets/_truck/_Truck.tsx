import { Card, Icon, makeStyles, Text } from "@rneui/themed";
import { Image, TouchableOpacity, View } from "react-native";

import { TruckWithDriver } from "@/schemas";
import { colors, iconSize } from "@/services/theme/constants";
import { getTruckBrandImage } from "@/services/truck-brand-images";

import { Flex } from "@/components/ui";
import { router } from "expo-router";

type TruckProps = {
  truck: TruckWithDriver;
};

export function Truck({ truck }: TruckProps) {
  const styles = useStyles();

  const handlePress = () => {
    router.push(`/manager/fleets/${truck.fleet_id}/trucks/${truck.id}/details`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Card>
        <Flex justify="space-between">
          <Flex>
            <Image
              source={getTruckBrandImage(truck.brand_name)}
              style={styles.image}
            />

            <View>
              <Text h3>
                {truck.brand_name} {truck.model}
              </Text>
              <Text>{truck.license_plate}</Text>
              <Text h4>
                {truck.driver ? truck.driver.user.name : "Sem motorista"}
              </Text>
            </View>
          </Flex>

          <Icon
            type="material"
            name="keyboard-arrow-right"
            color={colors.primary}
            size={iconSize.xl}
          />
        </Flex>
      </Card>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing.lg,
  },
  image: {
    height: 50,
    width: 50,
  },
}));
