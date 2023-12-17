import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Expense extends BaseEntity {
  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.expenses) // Adjusted here
  category: Category;

  @Column()
  amount: number;

  @Column()
  date: Date;
}
