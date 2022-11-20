import { IsInt, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;

  @IsInt()
  course: number;

  @IsInt()
  index: number;

  @IsInt()
  block: number;
}
