import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateScheduleSubjectDto } from './create-schedule-subject.dto';

export class CreateBaseScheduleDto {
  @IsInt()
  groupId: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  altText?: string;

  @IsDateString()
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleSubjectDto)
  subjects: CreateScheduleSubjectDto[];
}
