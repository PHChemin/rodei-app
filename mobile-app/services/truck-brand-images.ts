import { TruckBrands } from "./enums/TruckBrandsEnum";

const truckBrandImages: Record<TruckBrands, any> = {
  [TruckBrands.Scania]: require("@/assets/images/truck_brands/Scania.png"),
  [TruckBrands.Volvo]: require("@/assets/images/truck_brands/Volvo.png"),
  [TruckBrands.Daf]: require("@/assets/images/truck_brands/DAF.png"),
  [TruckBrands.Man]: require("@/assets/images/truck_brands/MAN.png"),
  [TruckBrands.MercedesBenz]: require("@/assets/images/truck_brands/Mercedes-Benz.png"),
  [TruckBrands.Volkswagen]: require("@/assets/images/truck_brands/Volkswagen.png"),
  [TruckBrands.Iveco]: require("@/assets/images/truck_brands/Iveco.png"),
};

export const getTruckBrandImage = (brand: string): any => {
  return truckBrandImages[brand as TruckBrands];
};
