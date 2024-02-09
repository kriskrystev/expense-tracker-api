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

  async getTotalExpensesForEachCategory() {
    const queryBuilder = this.expenseRepository.createQueryBuilder('expense');
    queryBuilder.leftJoinAndSelect('expense.category', 'category');
    const { entities } = await queryBuilder.getRawAndEntities();
    const results = entities.reduce((acc, current) => {
      if (!acc[current.category.name]) {
        acc[current.category.name] = {
          expenseSum: 0,
        };
      } else {
        acc[current.category.name].expenseSum += current.amount;
      }

      return acc;
    }, {});
    return results;
  }

  /**
   * Returns the min and max by category
   * e.g You've spent 20 on bills, 30 on food, 500 on rent
   * the min would be 20 and the max would be 500 on rent
   */
  async getCategoriesExtremes() {
    const results = await this.getTotalExpensesForEachCategory();
    const expenses = [];
    for (const key in results) {
      if (Object.prototype.hasOwnProperty.call(results, key)) {
        const element = results[key];
        expenses.push(element.expenseSum);
      }
    }

    return {
      min: Math.min(...expenses),
      max: Math.max(...expenses),
    };
  }
}
