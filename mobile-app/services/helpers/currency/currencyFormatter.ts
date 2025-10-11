export function parseCurrency(value: string): number {
  if (!value) return 0;

  // Remove todos os pontos (milhares) e substitui a vírgula por ponto
  const normalized = value.replace(/\./g, "").replace(",", ".");

  return parseFloat(normalized) || 0;
}
