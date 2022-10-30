import { Group } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateGroupDto implements Omit<Group, 'id'> {
  @IsString()
  name: string;

  @IsNumber()
  course: number;

  @IsNumber()
  index: number;

  @IsNumber()
  block: number;
}
