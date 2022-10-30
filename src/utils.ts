export function determineScheduleType(now: number) {
  return Math.floor(now / 86400000 - 4) % 14 < 7 ? 'ЗНАМЕНАТЕЛЬ' : 'ЧИСЛИТЕЛЬ';
}
