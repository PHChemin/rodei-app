import { useFocusEffect } from "expo-router";

export default function useCallbackLoop(
  callback: () => void,
  ms: number = 5000,
) {
  useFocusEffect(() => {
    const listender = setInterval(() => {
      callback();
    }, ms);

    return () => clearInterval(listender);
  });
}
