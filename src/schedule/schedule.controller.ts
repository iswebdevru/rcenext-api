import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBaseScheduleDto } from './dto/create-base-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('base')
  findAllBase(@Query() findScheduleDto: FindScheduleDto) {
    return this.scheduleService.findAllBase(findScheduleDto);
  }

  @Post('base')
  createBase(@Body() createBaseScheduleDto: CreateBaseScheduleDto) {
    return this.scheduleService.createBase(createBaseScheduleDto);
  }

  @Get('changes')
  findAllChanges() {
    return this.scheduleService.findAllChanges();
  }
}
