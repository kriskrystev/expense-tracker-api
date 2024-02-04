import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/expense/entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  async findTopBetweenDates(
    top: number,
    from: string,
    to: string,
    categoryId: string,
  ) {
    const unsorted = await this.expenseRepository
      .createQueryBuilder('expense')
      .where('expense.categoryId = :categoryId', {
        categoryId: categoryId,
      })
      .andWhere('expense.date BETWEEN :startDate AND :endDate', {
        startDate: new Date(from),
        endDate: new Date(to),
      })
      .getMany();
    const topNResults = unsorted
      .sort((expenseA, expenseB) => expenseB.amount - expenseA.amount)
      .slice(0, top);
    return topNResults;
  }
}
