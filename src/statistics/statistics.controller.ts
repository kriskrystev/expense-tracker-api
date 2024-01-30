import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  findTop(
    @Query('top') top: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.statisticsService.findTop(top, from, to);
  }
}
