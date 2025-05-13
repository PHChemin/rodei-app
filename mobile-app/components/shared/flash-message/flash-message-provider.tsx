import Constants from "expo-constants";
import useFlashMessages from "@/hooks/use-flash-messages";
import { PropsWithChildren } from "react";

import FlashMessageRenderer from "./flash-message-renderer";

export default function FlashMessageProvider({ children }: PropsWithChildren) {
  const { flashMessages } = useFlashMessages();

  return (
    <>
      {children}

      {[...flashMessages.values()].map((flashMessage, index) => (
        <FlashMessageRenderer
          key={flashMessage.id}
          {...flashMessage}
          style={{ marginTop: Constants.statusBarHeight + index * 24 }}
        />
      ))}
    </>
  );
}
