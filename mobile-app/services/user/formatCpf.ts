export function formatCPF(cpf: string): string {
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2") // 123456 -> 123.456
    .replace(/(\d{3})(\d)/, "$1.$2") // 123456789 -> 123.456.789
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // último -> 123.456.789-09
}
