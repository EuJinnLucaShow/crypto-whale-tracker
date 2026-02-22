export const formatCrypto = (
  value: string | null | undefined,
  isFiat: boolean = false,
) => {
  if (!value) return isFiat ? "$0" : "0";

  const num = Number.parseFloat(value);
  if (Number.isNaN(num)) return isFiat ? "$0" : "0";

  if (!isFiat && num > 0 && num < 0.001) {
    return "< 0.001";
  }

  return new Intl.NumberFormat("en-US", {
    style: isFiat ? "currency" : "decimal",
    currency: "USD",
    notation: num >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(num);
};
