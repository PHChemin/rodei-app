import { Card, Icon, makeStyles, Text } from "@rneui/themed";
import { Image, TouchableOpacity, View } from "react-native";

import { TruckBase } from "@/schemas";
import { colors, iconSize } from "@/services/theme/constants";

import { Flex } from "@/components/ui";

type TruckProps = {
  truck: TruckBase;
};

export function Truck({ truck }: TruckProps) {
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.container}>
      <Card>
        <Flex justify="space-between">
          <Flex>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.image}
            />

            <View>
              <Text h3>
                {truck.brand_name} {truck.model}
              </Text>
              <Text>{truck.license_plate}</Text>
              <Text h4>Motorista teste</Text>
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
