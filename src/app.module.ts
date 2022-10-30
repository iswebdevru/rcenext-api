import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GroupModule } from './group/group.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, GroupModule, TeacherModule],
})
export class AppModule {}
