import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./pt.json";

export const defaultNS = "pt";

export const resources = {
  pt: {
    pt,
  },
} as const;

i18next.use(initReactI18next).init({
  lng: "pt",
  ns: ["pt"],
  defaultNS,
  resources,
});

// t() does not work outside of components
export default i18next;
