import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBaseScheduleDto } from './dto/create-base-schedule.dto';
import { CreateScheduleChangesDto } from './dto/create-schedule-changes.dto';
import { FindBaseScheduleDto } from './dto/find-all-base-schedule.dto';
import { FindScheduleDto } from './dto/find-schedule-changes.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  findAll(@Query() findScheduleDto: FindScheduleDto) {
    return this.scheduleService.findAll(findScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.scheduleService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduleDto: UpdateScheduleDto
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Get('group/:groupId')
  findOneForGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() findScheduleDto: FindScheduleDto
  ) {
    return this.scheduleService.findOneForGroup(groupId, findScheduleDto);
  }

  @Get('base')
  findAllBase(@Query() findAllBaseScheduleDto: FindBaseScheduleDto) {
    return this.scheduleService.findAllBase(findAllBaseScheduleDto);
  }

  @Get('base/group/:groupId')
  findOneBaseForGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() findBaseScheduleDto: FindBaseScheduleDto
  ) {
    return this.scheduleService.findOneBaseForGroup(
      groupId,
      findBaseScheduleDto
    );
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
  findOneChangesForGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Query() findScheduleDto: FindScheduleDto
  ) {
    return this.scheduleService.findOneChangesForGroup(
      groupId,
      findScheduleDto
    );
  }

  @Post('changes')
  createChanges(@Body() createScheduleChangesDto: CreateScheduleChangesDto) {
    return this.scheduleService.createChanges(createScheduleChangesDto);
  }
}
