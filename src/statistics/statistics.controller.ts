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
  findTotalExpensesForEachCategory() {
    return this.statisticsService.getTotalExpensesForEachCategory();
  }

  @Get('/category-extremes')
  findCategoryExtremes() {
    return this.statisticsService.getCategoriesExtremes();
  }

  @Get('/percentage-by-categories')
  findCategoryPercentageOfTotal() {
    return this.statisticsService.getPercentageOfEachCategory();
  }

  @Get('/average-monthly')
  findAverageMonthlyExpenses() {
    const date = new Date();

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.statisticsService.getAverageMonthlyExpenses(
      startOfMonth,
      endOfMonth,
    );
  }
}
