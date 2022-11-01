import { IsIn } from 'class-validator';
import { BASE_DAYS, ScheduleDay, ScheduleType } from '../constants';

export class FindScheduleDto {
  @IsIn(Object.keys(BASE_DAYS['ЧИСЛИТЕЛЬ']))
  day: ScheduleDay;

  @IsIn(Object.keys(BASE_DAYS))
  type: ScheduleType;
}
