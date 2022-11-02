import { IsIn } from 'class-validator';
import { BASE_DAYS, ScheduleDay, ScheduleType } from '../schedule.constants';
import { AbstractCreateScheduleDto } from './abstract-create-schedule.dto';

export class CreateBaseScheduleDto extends AbstractCreateScheduleDto {
  @IsIn(Object.keys(BASE_DAYS['ЧИСЛИТЕЛЬ']))
  day: ScheduleDay;

  @IsIn(Object.keys(BASE_DAYS))
  type: ScheduleType;
}
