import { IsString, MaxLength } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MaxLength(25)
  name: string;
}
