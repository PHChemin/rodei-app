// https://docs.pmnd.rs/zustand/guides/maps-and-sets-usage
// https://docs.pmnd.rs/zustand/integrations/immer-middleware

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

type State = {
  data: Map<string, any>;
};

type Actions = {
  cache: (key: string, params: any) => void;
  cached: <T>(key: string, defaultValue?: T) => T;
  invalidate: (key: string) => void;
};

export const useCache = create(
  immer<State & Actions>((set, get) => ({
    data: new Map<string, any>(),

    cache: (key: string, params: any) => {
      set((state) => {
        state.data.set(key, params);
      });
    },

    cached: <T>(key: string, defaultValue?: T): T => {
      if (!get().data.has(key)) {
        if (defaultValue) {
          return defaultValue;
        } else {
          throw new Error("useCache has no data for key: " + key);
        }
      }

      return get().data.get(key) as T;
    },

    invalidate: (key: string) => {
      set((state) => {
        state.data.delete(key);
      });
    },
  }))
);
