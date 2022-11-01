export const BASE_DAYS = {
  ЗНАМЕНАТЕЛЬ: {
    ПН: '2022-09-05T00:00:00.000Z',
    ВТ: '2022-09-06T00:00:00.000Z',
    СР: '2022-09-07T00:00:00.000Z',
    ЧТ: '2022-09-08T00:00:00.000Z',
    ПТ: '2022-09-09T00:00:00.000Z',
    СБ: '2022-09-10T00:00:00.000Z',
  } as const,
  ЧИСЛИТЕЛЬ: {
    ПН: '2022-09-12T00:00:00.000Z',
    ВТ: '2022-09-13T00:00:00.000Z',
    СР: '2022-09-14T00:00:00.000Z',
    ЧТ: '2022-09-15T00:00:00.000Z',
    ПТ: '2022-09-16T00:00:00.000Z',
    СБ: '2022-09-17T00:00:00.000Z',
  } as const,
} as const;

export type ScheduleType = keyof typeof BASE_DAYS;
export type ScheduleDay = keyof typeof BASE_DAYS['ЧИСЛИТЕЛЬ'];