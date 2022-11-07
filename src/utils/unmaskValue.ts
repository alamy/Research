export const unmaskValue = (value: string): number => {
  if (value.includes('T')) return Number(value.replace(/\D/g, '')) * 1000000000000;
  if (value.includes('B')) return Number(value.replace(/\D/g, '')) * 1000000000;
  if (value.includes('M')) return Number(value.replace(/\D/g, '')) * 1000000;
  if (value.includes('K')) return Number(value.replace(/\D/g, '')) * 1000;
  return Number(value.replace(/\D/g, ''));
};
