import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MaxLength(25)
  name: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  teachers?: number[];
}
