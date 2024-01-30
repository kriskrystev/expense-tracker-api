import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/entities/expense.entity';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    CategoryModule,
    ExpenseModule,
    StatisticsModule,
    TypeOrmModule.forRoot({
      // this is a config for dev/test only, don't use in prod
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'expense-tracker',
      entities: [Expense, Category],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
