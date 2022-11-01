import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateBaseScheduleDto } from './dto/create-base-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('base')
  findAllBase() {
    return this.scheduleService.findAllBase();
  }

  @Post('base')
  createBase(@Body() createBaseScheduleDto: CreateBaseScheduleDto) {
    return this.scheduleService.createBase(createBaseScheduleDto);
  }

  @Get('changes')
  findAllChanges() {
    return 'Здесь будут изменения';
  }
}
