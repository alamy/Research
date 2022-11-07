export const getMaskedValue = (value: string | number): string => {
  const valueAsNumber = Number(value);
  if (!valueAsNumber) return value ? `${value}` : '';

  const thousands = Math.floor(valueAsNumber / 1000);
  const milions = Math.floor(valueAsNumber / 1000000);
  const bilions = Math.floor(valueAsNumber / 1000000000);
  const trillions = Math.floor(valueAsNumber / 1000000000000);

  if (trillions) return `${trillions}T`;
  if (bilions) return `${bilions}B`;
  if (milions) return `${milions}M`;
  if (thousands) return `${thousands}K`;
  return valueAsNumber ? `${valueAsNumber}` : '';
};
