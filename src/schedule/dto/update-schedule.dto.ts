import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateScheduleSubjectDto } from './create-schedule-subject.dto';

export abstract class UpdateScheduleDto {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  altText?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleSubjectDto)
  @IsOptional()
  subjects?: CreateScheduleSubjectDto[];
}
