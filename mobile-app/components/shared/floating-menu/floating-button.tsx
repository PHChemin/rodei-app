import { defaultShadow } from "@/services/theme";
import { Icon, IconProps, makeStyles } from "@rneui/themed";
import { TouchableOpacity, ViewProps } from "react-native";

type FloatingButtonProps = {
  onPress?: () => void;
  icon?: IconProps;
  containerStyle?: ViewProps["style"];
};

export default function FloatingButton({
  onPress,
  icon,
  containerStyle,
}: FloatingButtonProps) {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Icon
        type={icon ? icon.type : "antdesign"}
        name={icon ? icon.name : "plus"}
        color={icon ? icon.color : "white"}
      />
    </TouchableOpacity>
  );
}

const size = 50;

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "hsl(0, 100%, 70%)",
    justifyContent: "center",
    alignItems: "center",
    ...defaultShadow,
  },
}));
