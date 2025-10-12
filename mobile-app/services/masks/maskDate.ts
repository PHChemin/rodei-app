export function maskDate(value: string): string {
  // Remove tudo que não for número
  let numbers = value.replace(/\D/g, "").slice(0, 8);

  let day = numbers.slice(0, 2);
  let month = numbers.slice(2, 4);
  let year = numbers.slice(4, 8);

  // Limita dia e mês
  if (parseInt(day, 10) > 31) day = "31";
  if (parseInt(month, 10) > 12) month = "12";

  let result = day;
  if (month) result += "/" + month;
  if (year) result += "/" + year;

  return result;
}
