import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { BASE_DAYS, ScheduleDay, ScheduleType } from '../constants';
import { CreateScheduleSubjectDto } from './create-schedule-subject.dto';

export class CreateBaseScheduleDto {
  @IsInt()
  groupId: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  altText?: string;

  @IsIn(Object.keys(BASE_DAYS['ЧИСЛИТЕЛЬ']))
  day: ScheduleDay;

  @IsIn(Object.keys(BASE_DAYS))
  type: ScheduleType;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleSubjectDto)
  subjects: CreateScheduleSubjectDto[];
}
