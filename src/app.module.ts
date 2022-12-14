import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GroupModule } from './group/group.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  controllers: [AppController],
  imports: [
    PrismaModule,
    GroupModule,
    TeacherModule,
    SubjectModule,
    ScheduleModule,
    UtilsModule,
  ],
})
export class AppModule {}
