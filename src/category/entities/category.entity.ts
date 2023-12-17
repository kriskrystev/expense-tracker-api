import { BaseEntity } from 'src/core/entities/base.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
