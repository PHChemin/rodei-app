import { DEFAULT_RADIUS, defaultShadow } from "@/services/theme";
//@ts-ignore
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import Constants from "expo-constants";
import { Pressable, Text, View } from "react-native";

export const HEADER_HEIGHT = 96;

export default function AppHeader(props: NativeStackHeaderProps) {
  return (
    <View style={{ backgroundColor: "#f8f8fb" }}>
      <View
        style={[
          {
            borderBottomLeftRadius: DEFAULT_RADIUS,
            borderBottomRightRadius: DEFAULT_RADIUS,
            backgroundColor: "white",
            height: HEADER_HEIGHT,
            paddingTop: Constants.statusBarHeight,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
          },
          defaultShadow,
        ]}
      >
        {props.navigation.canGoBack() && props.options.headerBackVisible ? (
          <Pressable
            onPress={() => props.navigation.goBack()}
            style={{ marginRight: 16 }}
          >
            <Icon type="antdesign" name="left" />
          </Pressable>
        ) : (
          <View />
        )}

        <Text style={{ fontWeight: "bold", fontSize: 16, flex: 1 }}>
          {props.options.title}
        </Text>

        {props.options.headerRight?.({
          canGoBack: props.navigation.canGoBack(),
        })}
      </View>
    </View>
  );
}
