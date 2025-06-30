import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UserBase } from "@/schemas";

type State = {
  token: string | null;
  user: UserBase | null;
};

type Actions = {
  setToken: (token: string, user: UserBase) => void;
  clearToken: () => void;
};

export const useToken = create<State & Actions>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token: string, user: UserBase) => set(() => ({ token, user })),
      clearToken: () => set(() => ({ token: null, user: null })),
    }),
    {
      name: "api-token",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
