export const formatTime = (time: number): string => {
  return time < 10 ? `0${time}` : time.toString();
};

export const formatHour = (date: Date): string => {
  const hours = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};
