import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateScheduleSubjectDto } from './create-schedule-subject.dto';

export abstract class AbstractCreateScheduleDto {
  @IsInt()
  groupId: number;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  altText?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleSubjectDto)
  subjects: CreateScheduleSubjectDto[];
}
