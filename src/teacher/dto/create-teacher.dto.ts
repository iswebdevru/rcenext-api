import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  patronymic: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  subjects?: number[];
}
