import { PropsWithChildren, useEffect } from "react";

import { checkEASUpdates } from "./check-eas-updates";
import { useCallbackOnResume } from "@/hooks/use-callback-on-resume";

export function UpdateProvider({ children }: PropsWithChildren) {
  async function fetchUpdateAsync() {
    await checkEASUpdates();
  }

  useEffect(() => {
    fetchUpdateAsync();
  }, []);

  useCallbackOnResume(
    fetchUpdateAsync,
    process.env.EXPO_PUBLIC_EAS_CHANNEL == "production" ? 5 : 1 // search for updates after 5 mins idle on prod, 1 min on staging
  );

  return children;
}
