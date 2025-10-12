import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function formatToApiDate(date: string): string {
  if (!date) return "";

  const parsed = dayjs(date, "DD/MM/YYYY", true); // ⚠ o 'true' ativa a validação estrita

  if (!parsed.isValid()) return "2006-02-31"; // Inválida

  return parsed.format("YYYY-MM-DD");
}

export function formatToDisplayDate(date: string): string {
  if (!date) return "";
  return dayjs(date, "YYYY-MM-DD").format("DD/MM/YYYY");
}
