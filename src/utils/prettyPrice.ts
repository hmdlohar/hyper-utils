const intlObj = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
  style: "currency",
  currency: "INR",
});
export function prettyPrice(number: any) {
  //   if (Number.isNaN(Number(number))) return "";
  return intlObj.format(number);
}
