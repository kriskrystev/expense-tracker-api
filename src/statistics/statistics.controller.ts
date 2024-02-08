import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  findTopBetweenDates(
    @Query('top') top: number,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('categoryId') categoryId: string,
  ) {
    return this.statisticsService.findTopBetweenDates(
      top,
      from,
      to,
      categoryId,
    );
  }

  @Get('/total-expenses')
  findToTatalExpensesForEachCategory() {
    return this.statisticsService.getTotalExpensesForEachCategory();
  }
}
