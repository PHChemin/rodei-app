import { makeStyles } from "@rneui/themed";
import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DURATION = 6000;

interface AutoCloseBarProps {
  onComplete: () => void;
}

export default function AutoCloseBar({ onComplete }: AutoCloseBarProps) {
  const styles = useStyles();
  const percent = useSharedValue(100);

  const style = useAnimatedStyle(() => ({
    width: `${percent.value}%`,
  }));

  useEffect(() => {
    percent.value = withTiming(0, {
      duration: DURATION,
      easing: Easing.linear,
    });

    setTimeout(onComplete, DURATION);
  }, []);

  return <Animated.View style={[styles.bar, style]} />;
}

const useStyles = makeStyles((theme) => ({
  bar: {
    marginTop: theme.spacing.md,
    backgroundColor: "white",
    height: 1,
  },
}));
