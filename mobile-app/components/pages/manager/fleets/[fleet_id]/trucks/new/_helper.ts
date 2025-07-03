import { TruckBrands } from "@/services/enums/TruckBrandsEnum";
import { TruckColors } from "@/services/enums/TruckColorsEnum";

import { SelectInputItem } from "@/components/ui/select-input/_SelectModal";

export const truckBrandOptions: SelectInputItem[] = [
  { label: "Scania", value: TruckBrands.Scania },
  { label: "Volvo", value: TruckBrands.Volvo },
  { label: "Daf", value: TruckBrands.Daf },
  { label: "Iveco", value: TruckBrands.Iveco },
  { label: "Man", value: TruckBrands.Man },
  { label: "Mercedes-Benz", value: TruckBrands.MercedesBenz },
  { label: "Volkswagen", value: TruckBrands.Volkswagen },
];

export const colorOptions: SelectInputItem[] = [
  { label: "Azul", value: TruckColors.Azul },
  { label: "Azul Clara", value: TruckColors.AzulClara },
  { label: "Azul Escura", value: TruckColors.AzulEscura },
  { label: "Bege", value: TruckColors.Bege },
  { label: "Branca", value: TruckColors.Branca },
  { label: "Cinza", value: TruckColors.Cinza },
  { label: "Cinza Clara", value: TruckColors.CinzaClara },
  { label: "Cinza Escura", value: TruckColors.CinzaEscura },
  { label: "Dourada", value: TruckColors.Dourada },
  { label: "Grená", value: TruckColors.Grená },
  { label: "Laranja", value: TruckColors.Laranja },
  { label: "Marrom", value: TruckColors.Marrom },
  { label: "Prata", value: TruckColors.Prata },
  { label: "Preta", value: TruckColors.Preta },
  { label: "Rosa", value: TruckColors.Rosa },
  { label: "Roxa", value: TruckColors.Roxa },
  {
    label: "Sem Cor Predominante",
    value: TruckColors.SemCorPredominante,
  },
  { label: "Verde", value: TruckColors.Verde },
  { label: "Verde Clara", value: TruckColors.VerdeClara },
  { label: "Verde Escura", value: TruckColors.VerdeEscura },
  { label: "Vermelha", value: TruckColors.Vermelha },
];
