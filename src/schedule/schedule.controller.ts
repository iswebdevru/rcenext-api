import { Controller, Get } from '@nestjs/common';

@Controller('schedules')
export class ScheduleController {
  @Get('base')
  findAllBase() {
    return 'Здесь будет базовое расписание';
  }

  @Get('changes')
  findAllChanges() {
    return 'Здесь будут изменения';
  }
}
