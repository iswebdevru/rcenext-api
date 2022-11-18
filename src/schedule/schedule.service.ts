import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BASE_DAYS } from './schedule.constants';
import { CreateBaseScheduleDto } from './dto/create-base-schedule.dto';
import { FindBaseScheduleDto } from './dto/find-all-base-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule-changes.dto';
import { floorDateJSON, getScheduleBaseDate } from './schedule.utils';
import { CreateScheduleChangesDto } from './dto/create-schedule-changes.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

interface AbstractFindBaseScheduleOptions {
  isBase: boolean;
  date: string;
}

interface AbstractFindScheduleChangesOptions {
  isBase: boolean;
  date: string;
  groupId: number;
}

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  private async _abstractFindAll(options: AbstractFindBaseScheduleOptions) {
    return this.prisma.schedule.findMany({
      where: options,
      include: { group: true, subjects: true },
    });
  }

  /**
   * @returns Основное расписание для всех групп на указанный день
   */
  async findAllBase({ type, day }: FindBaseScheduleDto) {
    return this._abstractFindAll({
      isBase: true,
      date: BASE_DAYS[type][day],
    });
  }

  /**
   * @returns Изменения в расписании для всех групп на указанный день
   */
  async findAllChanges({ date }: FindScheduleDto) {
    return this._abstractFindAll({
      isBase: false,
      date: floorDateJSON(date),
    });
  }

  /**
   * @returns Расписание для всех групп на указанный день с учетом изменений
   */
  async findAll(changesParams: FindScheduleDto) {
    const baseParams = getScheduleBaseDate(new Date(changesParams.date));
    const [base, changes] = await Promise.all([
      this.findAllBase(baseParams),
      this.findAllChanges(changesParams),
    ]);
    const schedulesWithNoChanges = base.filter(
      baseSchedule =>
        !changes.find(
          scheduleChanges => scheduleChanges.groupId === baseSchedule.groupId
        )
    );
    return [...schedulesWithNoChanges, ...changes];
  }

  private async _abstractFindOneForGroup(
    options: AbstractFindScheduleChangesOptions
  ) {
    const schedule = await this.prisma.schedule.findFirst({
      where: options,
      include: { group: true, subjects: true },
    });
    if (!schedule) {
      throw new NotFoundException(
        `Schedule with specified groupId and/or date doesn't exist`
      );
    }
    return schedule;
  }

  /**
   * @returns Основное расписание на указанный день для указанной группы
   */
  async findOneBaseForGroup(
    groupId: number,
    { type, day }: FindBaseScheduleDto
  ) {
    return this._abstractFindOneForGroup({
      isBase: true,
      date: BASE_DAYS[type][day],
      groupId,
    });
  }

  /**
   * @returns Изменения в расписании на указанный день для указанной группы
   */
  async findOneChangesForGroup(groupId: number, { date }: FindScheduleDto) {
    return this._abstractFindOneForGroup({
      isBase: false,
      date: floorDateJSON(date),
      groupId,
    });
  }

  /**
   * @returns Расписание с учетом изменений для указанной группы
   */
  async findOneForGroup(groupId: number, changesParams: FindScheduleDto) {
    try {
      return await this.findOneChangesForGroup(groupId, changesParams);
    } catch {
      const baseParams = getScheduleBaseDate(new Date(changesParams.date));
      return this.findOneBaseForGroup(groupId, baseParams);
    }
  }

  private async _abstractCreate(
    isBase: boolean,
    createScheduleDto: CreateScheduleChangesDto
  ) {
    const { groupId, altText, subjects, date } = createScheduleDto;

    let createdScheduleId = -1;
    try {
      const { id: scheduleId } = await this.prisma.schedule.create({
        data: {
          date,
          altText,
          group: { connect: { id: groupId } },
          isBase,
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

  async createBase(createBaseScheduleDto: CreateBaseScheduleDto) {
    const { day, type, ...rest } = createBaseScheduleDto;
    return this._abstractCreate(true, { date: BASE_DAYS[type][day], ...rest });
  }

  async createChanges(createScheduleChangesDto: CreateScheduleChangesDto) {
    return this._abstractCreate(false, {
      ...createScheduleChangesDto,
      date: floorDateJSON(createScheduleChangesDto.date),
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.schedule.delete({ where: { id } });
      return {
        message: `Schedule with id=${id} has been removed`,
      };
    } catch {
      throw new NotFoundException(`Schedule with id=${id} doesn't exist`);
    }
  }

  async update(scheduleId: number, { altText, subjects }: UpdateScheduleDto) {
    if (altText) {
      try {
        await this.prisma.schedule.update({
          where: { id: scheduleId },
          data: { altText },
        });
      } catch {
        throw new NotFoundException(
          `Schedule with id=${scheduleId} doesn't exist`
        );
      }
    }
    if (subjects) {
      try {
        await this.prisma.scheduleCrossSubject.deleteMany({
          where: { scheduleId },
        });
        await Promise.all(
          subjects.map(subject => {
            return this.prisma.scheduleCrossSubject.create({
              data: {
                schedule: { connect: { id: scheduleId } },
                index: subject.index,
                cabinet: {
                  connectOrCreate: {
                    where: { value: subject.cabinet },
                    create: { value: subject.cabinet },
                  },
                },
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
            });
          })
        );
      } catch {
        throw new BadRequestException(`Some data don't exist in database`);
      }
    }
    return this.prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { subjects: true, group: true },
    });
  }
}
