import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  data: Record<string, any>;
};

type Actions = {
  cache: (key: string, params: any) => void;
  cached: <T>(key: string, defaultValue?: T) => T;
  invalidate: (key: string) => void;
};

export const useCache = create(
  immer<State & Actions>((set, get) => ({
    data: {},

    cache: (key, params) => {
      set((state) => {
        state.data[key] = params;
      });
    },

    cached: <T>(key: string, defaultValue?: T): T => {
      const value = get().data[key];
      if (value === undefined) {
        if (defaultValue !== undefined) {
          return defaultValue;
        }
        throw new Error("useCache has no data for key: " + key);
      }
      return value;
    },

    invalidate: (key) => {
      set((state) => {
        delete state.data[key];
      });
    },
  }))
);
