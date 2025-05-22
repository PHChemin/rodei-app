import { FleetBase, TruckBase } from "@/schemas";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  fleets: FleetBase[];
};

type Actions = {
  add: (fleet: FleetBase) => void;
  remove: (id: number) => void;
  update: (id: number, fleet: FleetBase) => void;
  list: () => FleetBase[];
  get: (id: number) => FleetBase;
  addTruck: (fleetId: number, truck: TruckBase) => void;
};

export const useFleetStore = create(
  immer<State & Actions>((set, get) => ({
    fleets: [],

    add: (fleet) => {
      set((state) => {
        state.fleets.push(fleet);
      });
    },

    remove: (id) => {
      set((state) => {
        state.fleets = state.fleets.filter((f) => f.id !== id);
      });
    },

    update: (id, fleet) => {
      set((state) => {
        const index = state.fleets.findIndex((f) => f.id === id);
        if (index !== -1) {
          state.fleets[index] = fleet;
        } else {
          throw new Error(`Frota não encontrada!`);
        }
      });
    },

    list: () => {
      return get().fleets;
    },

    get: (id) => {
      const fleet = get().fleets.find((f) => f.id === id);
      if (!fleet) throw new Error(`Frota não encontrada!`);
      return fleet;
    },

    addTruck: (fleetId, truck) => {
      set((state) => {
        const fleet = state.fleets.find((f) => f.id === fleetId);
        if (!fleet) throw new Error(`Frota não encontrada!`);
        fleet.trucks.push(truck);
      });
    },
  }))
);
