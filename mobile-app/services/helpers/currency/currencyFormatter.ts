export function parseCurrency(value: string): number {
  if (!value) return 0;

  // Remove todos os pontos (milhares) e substitui a vírgula por ponto
  const normalized = value.replace(/\./g, "").replace(",", ".");

  return parseFloat(normalized) || 0;
}

export function formatNumberBRL(value: number): string {
  if (!value) return "0,00";

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
