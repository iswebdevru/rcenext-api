import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBaseScheduleDto } from './dto/create-base-schedule.dto';
import { FindBaseScheduleDto } from './dto/find-all-base-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule-changes.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  findAll(@Query() findScheduleDto: FindScheduleDto) {
    return this.scheduleService.findAll(findScheduleDto);
  }

  @Get('group/:groupId')
  findOne(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() findScheduleDto: FindScheduleDto
  ) {
    return this.scheduleService.findOne(groupId, findScheduleDto);
  }

  @Get('base')
  findAllBase(@Query() findAllBaseScheduleDto: FindBaseScheduleDto) {
    return this.scheduleService.findAllBase(findAllBaseScheduleDto);
  }

  @Get('base/group/:groupId')
  findOneBase(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() findBaseScheduleDto: FindBaseScheduleDto
  ) {
    return this.scheduleService.findOneBase(groupId, findBaseScheduleDto);
  }

  @Post('base')
  createBase(@Body() createBaseScheduleDto: CreateBaseScheduleDto) {
    return this.scheduleService.createBase(createBaseScheduleDto);
  }

  @Get('changes')
  findAllChanges(@Query() findAllScheduleChangesDto: FindScheduleDto) {
    return this.scheduleService.findAllChanges(findAllScheduleChangesDto);
  }

  @Get('changes/group/:groupId')
  findOneChanges(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() findScheduleDto: FindScheduleDto
  ) {
    return this.scheduleService.findOneChanges(groupId, findScheduleDto);
  }
}
