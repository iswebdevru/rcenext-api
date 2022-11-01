export function getScheduleType(date: Date) {
  return (floorDate(date).getTime() / 86400000 - 4) % 14 < 7
    ? 'ЗНАМЕНАТЕЛЬ'
    : 'ЧИСЛИТЕЛЬ';
}

export function floorDate(date: Date) {
  return new Date(date.setHours(3, 0, 0, 0));
}
