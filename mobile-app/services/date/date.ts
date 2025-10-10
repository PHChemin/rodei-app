import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function formatToApiDate(date: string): string {
  if (!date) return "";

  return dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD");
}

export function formatToDisplayDate(date: string): string {
  if (!date) return "";
  return dayjs(date, "YYYY-MM-DD").format("DD/MM/YYYY");
}
