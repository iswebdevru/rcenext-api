import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateScheduleSubjectDto {
  @IsInt()
  index: number;

  @IsInt()
  teacherId: number;

  @IsInt()
  subjectId: number;

  @IsString()
  @MaxLength(25)
  cabinet: string;

  @IsString()
  @MaxLength(25)
  @IsOptional()
  info?: string;
}
