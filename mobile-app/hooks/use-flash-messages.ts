import { FlashMessageRendererProps } from "@/components/shared/flash-message/flash-message-renderer";
import * as Crypto from "expo-crypto";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  flashMessages: FlashMessageRendererProps[];
};

type Actions = {
  showFlashMessage: (
    flashMessage: Omit<FlashMessageRendererProps, "id">
  ) => void;
  closeFlashMessage: (id: string) => void;
};

const useFlashMessages = create(
  immer<State & Actions>((set) => ({
    flashMessages: [],

    showFlashMessage: (flashMessage) => {
      set((state) => {
        // Remove todos os autoClose existentes e recria com autoClose false
        state.flashMessages = state.flashMessages.map((msg) => ({
          ...msg,
          id: Crypto.randomUUID(),
          autoClose: false,
        }));

        // Adiciona novo flash message
        const id = Crypto.randomUUID();
        state.flashMessages.push({ id, ...flashMessage });
      });
    },

    closeFlashMessage: (id) => {
      set((state) => {
        state.flashMessages = state.flashMessages.filter(
          (msg) => msg.id !== id
        );
      });
    },
  }))
);

export default useFlashMessages;
