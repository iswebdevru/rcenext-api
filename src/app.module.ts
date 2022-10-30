import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GroupModule } from './group/group.module';

@Module({
  imports: [GroupModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
