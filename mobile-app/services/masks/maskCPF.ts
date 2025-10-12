export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11); // mantém só números e limita a 11

  return digits
    .replace(/(\d{3})(\d)/, "$1.$2") // primeiro ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // traço
}
