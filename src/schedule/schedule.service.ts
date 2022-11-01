import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { floorDate } from 'src/utils';
import { CreateBaseScheduleDto } from './dto/create-base-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async findAllBase(date?: Date) {
    return this.prisma.schedule.findMany({
      where: { date },
      include: {
        group: true,
        subjects: true,
      },
    });
  }

  async createBase(createBaseScheduleDto: CreateBaseScheduleDto) {
    const { date, groupId, altText, subjects } = createBaseScheduleDto;
    let createdScheduleId = -1;
    try {
      const { id: scheduleId } = await this.prisma.schedule.create({
        data: {
          date: floorDate(new Date(date)),
          altText,
          group: { connect: { id: groupId } },
          isBase: true,
        },
      });
      createdScheduleId = scheduleId;
      await Promise.all(
        subjects.map(subject => {
          return this.prisma.scheduleCrossSubject.create({
            data: {
              index: subject.index,
              cabinet: {
                connectOrCreate: {
                  where: { value: subject.cabinet },
                  create: { value: subject.cabinet },
                },
              },
              schedule: { connect: { id: scheduleId } },
              subject: {
                connect: {
                  subjectId_teacherId: {
                    subjectId: subject.subjectId,
                    teacherId: subject.teacherId,
                  },
                },
              },
              info: subject.info,
            },
            select: null,
          });
        })
      );
      return this.prisma.schedule.findUnique({
        where: { id: scheduleId },
        include: { group: true, subjects: true },
      });
    } catch {
      if (createdScheduleId !== -1) {
        await this.prisma.schedule.delete({ where: { id: createdScheduleId } });
        throw new BadRequestException(
          `Specified subjects and/or teachers don't exist`
        );
      }
      throw new BadRequestException(
        `Some of the following errors happened:
1: There is no group with id 'groupId'
2: Schedule for specified date and group already exists. Use PATCH method instead'`
      );
    }
  }
}
