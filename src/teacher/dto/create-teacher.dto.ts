import { Teacher } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateTeacherDto implements Omit<Teacher, 'id'> {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  patronymic: string;
}
