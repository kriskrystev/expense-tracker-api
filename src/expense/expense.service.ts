import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { PageOptionsDto } from 'src/core/dto/page-options.dto';
import { PageDto } from 'src/core/dto/page.dto';
import { ReadExpenseDto } from './dto/read-expense.dto';
import { PageMetaDto } from 'src/core/dto/page-meta.dto';
import { ExpenseNotFound } from './exceptions/expense-404';

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

  async findAll(
    pageOptionsDto: PageOptionsDto,
    explode: boolean,
  ): Promise<PageDto<ReadExpenseDto>> {
    const queryBuilder = this.expenseRepository.createQueryBuilder('expense');

    if (explode) {
      queryBuilder
        .leftJoinAndSelect('expense.category', 'category')
        .orderBy('expense.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);
    } else {
      queryBuilder
        .orderBy('expense.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async remove(id: string) {
    const exists = await this.expenseRepository.exist({ where: { id } });

    if (!exists) {
      throw new ExpenseNotFound(id);
    }

    const deleteResult = await this.expenseRepository.delete(id);
    return deleteResult.affected >= 1;
  }
}
