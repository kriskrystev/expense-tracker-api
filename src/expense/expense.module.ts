import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule, TypeOrmModule.forFeature([Expense])],
  controllers: [ExpenseController],
  providers: [CategoryService, ExpenseService],
  exports: [TypeOrmModule],
})
export class ExpenseModule {}
