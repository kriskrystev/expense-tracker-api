import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/expense/entities/expense.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  async findTop(top: number, from: string, to: string) {
    const unsorted = await this.expenseRepository
      .createQueryBuilder('expense')
      .where('expense.date BETWEEN :startDate AND :endDate', {
        startDate: from,
        endDate: to,
      })
      .getMany();
    const topNResults = unsorted
      .sort((expenseA, expenseB) => expenseB.amount - expenseA.amount)
      .slice(0, top);
    return topNResults;
  }
}
