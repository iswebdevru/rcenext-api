import { BASE_DAYS_MAP } from './schedule.constants';

export function getScheduleType(date: Date) {
  return (floorDate(date).getTime() / 86400000 - 4) % 14 < 7
    ? 'ЗНАМЕНАТЕЛЬ'
    : 'ЧИСЛИТЕЛЬ';
}

export function floorDate(date: Date) {
  return new Date(date.setHours(3, 0, 0, 0));
}

export function getScheduleBaseDate(date: Date) {
  return {
    type: getScheduleType(date),
    day: BASE_DAYS_MAP[date.getDay()],
  } as const;
}

export function floorDateJSON(date: string) {
  return floorDate(new Date(date)).toJSON();
}
