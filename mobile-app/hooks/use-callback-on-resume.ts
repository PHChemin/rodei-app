import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useCache } from "./use-cache";

const DEFAULT_TIMEOUT_MINUTES = 5;

/**
 * This hook triggers an onResume callback when the application returns from background state after a few minutes.
 * @param onResume Callback to be executed.
 * @param idleTimeoutMinutes Optional idle timeout in minutes. Default is 5. The callback will only be triggered if timeout is expired.
 */
export function useCallbackOnResume(
  onResume: () => void,
  idleTimeoutMinutes: number = DEFAULT_TIMEOUT_MINUTES
) {
  const { cache, cached } = useCache();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const onChange = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;

      if (appState.current !== "active") {
        cache("background-start-time", dayjs());
      } else {
        const start = cached<Dayjs>("background-start-time", dayjs());
        const diff = dayjs().diff(start);
        const backgroundTimeInMinutes = diff / (1000 * 60); // milliseconds to minutes

        if (backgroundTimeInMinutes > idleTimeoutMinutes) {
          onResume();
        }
      }
    });

    return () => {
      onChange.remove();
    };
  }, []);
}
