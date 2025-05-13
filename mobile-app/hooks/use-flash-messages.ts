import { FlashMessageRendererProps } from "@/components/shared/flash-message/flash-message-renderer";
import * as Crypto from "expo-crypto";
import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

enableMapSet();

type State = {
  flashMessages: Map<string, FlashMessageRendererProps>;
};

type Actions = {
  showFlashMessage: (
    flashMessage: Omit<FlashMessageRendererProps, "id">
  ) => void;
  closeFlashMessage: (id: string) => void;
};

const useFlashMessages = create(
  immer<State & Actions>((set) => ({
    flashMessages: new Map<string, FlashMessageRendererProps>(),

    showFlashMessage: (flashMessage: Omit<FlashMessageRendererProps, "id">) => {
      set((state) => {
        // remove autoClose for all existing flashMessages (re-create all to force re-render)
        state.flashMessages.forEach((oldFm) => {
          state.flashMessages.delete(oldFm.id);
          const subId = Crypto.randomUUID();
          state.flashMessages.set(subId, {
            autoClose: false,
            ...oldFm,
            id: subId,
          });
        });

        // insert a new flashMessage
        const id = Crypto.randomUUID();
        state.flashMessages.set(id, { id, ...flashMessage });
      });
    },

    closeFlashMessage: (id: string) => {
      set((state) => {
        state.flashMessages.delete(id);
      });
    },
  }))
);

export default useFlashMessages;
