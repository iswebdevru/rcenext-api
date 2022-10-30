import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GroupModule } from './group/group.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  imports: [PrismaModule, GroupModule],
})
export class AppModule {}
