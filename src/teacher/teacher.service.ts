import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as R from 'rambda';
@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { firstName, lastName, patronymic, subjects } = createTeacherDto;
    const { id: teacherId } = await this.prisma.teacher.create({
      data: {
        firstName,
        lastName,
        patronymic,
      },
    });
    if (subjects) {
      try {
        await this.prisma.subjectCrossTeacher.createMany({
          data: subjects.map(subjectId => ({
            teacherId,
            subjectId,
          })),
        });
      } catch {
        await this.prisma.teacher.delete({ where: { id: teacherId } });
        throw new NotFoundException(
          `Subjects with ids=[${subjects}] don't exist`
        );
      }
    }
    return this.prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        subjects: {
          select: { subject: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        subjects: {
          select: { subject: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        subjects: {
          select: { subject: true },
        },
      },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
    return teacher;
  }

  async update(teacherId: number, updateTeacherDto: UpdateTeacherDto) {
    const { firstName, lastName, patronymic, subjects } = updateTeacherDto;
    try {
      if (subjects) {
        const oldSubjects = R.pluck(
          'subjectId',
          await this.prisma.subjectCrossTeacher.findMany({
            where: { teacherId: teacherId },
            select: { subjectId: true },
          })
        );
        const recordsToDelete = oldSubjects.filter(
          sId => !subjects.includes(sId)
        );
        if (recordsToDelete.length) {
          await this.prisma.subjectCrossTeacher.deleteMany({
            where: {
              teacherId,
              subjectId: {
                in: recordsToDelete,
              },
            },
          });
        }
        const recordsToAdd = subjects.filter(sId => !oldSubjects.includes(sId));
        if (recordsToAdd.length) {
          await this.prisma.subjectCrossTeacher.createMany({
            data: recordsToAdd.map(subjectId => ({
              teacherId,
              subjectId,
            })),
          });
        }
      }
      return await this.prisma.teacher.update({
        where: { id: teacherId },
        data: {
          firstName,
          lastName,
          patronymic,
        },
        include: {
          subjects: {
            select: {
              subject: true,
            },
          },
        },
      });
    } catch (e) {
      throw new NotFoundException(
        `Either teacher with id=${teacherId} doesn't exist ${
          subjects ? `or subjects with ids=[${subjects}] don't exist` : ''
        }`
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.teacher.delete({ where: { id }, select: null });
      return `Teacher with id=${id} has been removed`;
    } catch {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
  }
}
