import { Block, Course, Group } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto implements Omit<Group, 'id'> {
  @IsString()
  name: string;

  @IsEnum(Course)
  course: Course;

  @IsNumber()
  index: number;

  @IsEnum(Block)
  block: Block;
}
