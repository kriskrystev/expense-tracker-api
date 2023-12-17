import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ExpenseService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = new Expense();
    expense.description = createExpenseDto.description;
    expense.amount = createExpenseDto.amount;
    expense.date = new Date(); // todo: figure out format and use the one that the create dto has

    const category = await this.categoryService.findOne(
      createExpenseDto.categoryId,
    );

    expense.category = category;

    return await this.expenseRepository.save(expense);
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
