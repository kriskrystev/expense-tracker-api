import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/expense/entities/expense.entity';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [TypeOrmModule],
})
export class StatisticsModule {}
