import { ReactNode } from "react";
import { create } from "zustand";

type Options = {
  transparent?: boolean;
};

const defaultOptions: Options = {
  transparent: false,
};

type State = {
  content: ReactNode;
  options?: Options;
};

type Actions = {
  showModal: (content: ReactNode, options?: Options) => void;
  hideModal: () => void;
};

const useModal = create<State & Actions>()((set) => ({
  content: undefined,
  options: defaultOptions,
  showModal: (content: ReactNode, options?: Options) =>
    set({ content, options: options || defaultOptions }),
  hideModal: () => set({ content: undefined }),
}));

export default useModal;
