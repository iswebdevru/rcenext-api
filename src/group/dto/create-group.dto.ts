import { Group } from '@prisma/client';
import { IsInt, IsString } from 'class-validator';

export class CreateGroupDto implements Omit<Group, 'id'> {
  @IsString()
  name: string;

  @IsInt()
  course: number;

  @IsInt()
  index: number;

  @IsInt()
  block: number;
}
