import { Subject } from '@prisma/client';
import { IsString, MaxLength } from 'class-validator';

export class CreateSubjectDto implements Omit<Subject, 'id'> {
  @IsString()
  @MaxLength(25)
  name: string;
}
