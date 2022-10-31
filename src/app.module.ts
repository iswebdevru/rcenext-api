import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GroupModule } from './group/group.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, GroupModule, TeacherModule, SubjectModule],
})
export class AppModule {}
