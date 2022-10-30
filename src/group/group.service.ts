import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({ data: createGroupDto });
  }

  findAll() {
    return this.prisma.group.findMany();
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Group with id=${id} doesn't exist`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      return await this.prisma.group.update({
        data: updateGroupDto,
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Group with id=${id} doesn't exist`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.group.delete({
        where: { id },
        select: null,
      });
      return `Group with id=${id} removed`;
    } catch {
      throw new NotFoundException(`Group with id=${id} doesn't exist`);
    }
  }
}
