export function maskCurrency(value: string): string {
  // Remove tudo que não for número
  const onlyNumbers = value.replace(/\D/g, "");

  if (!onlyNumbers) return "";

  // Divide por 100 para colocar vírgula nos centavos
  const numberValue = parseFloat(onlyNumbers) / 100;

  // Retorna no formato brasileiro
  return numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
