import { IsDateString } from 'class-validator';

export class FindScheduleDto {
  @IsDateString()
  date: string;
}
