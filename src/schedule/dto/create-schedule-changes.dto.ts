import { IsDateString } from 'class-validator';
import { AbstractCreateScheduleDto } from './abstract-create-schedule.dto';

export class CreateScheduleChangesDto extends AbstractCreateScheduleDto {
  @IsDateString()
  date: string;
}
