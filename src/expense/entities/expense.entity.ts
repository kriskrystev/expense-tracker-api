import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Expense extends BaseEntity {
  @Column()
  description: string;

  @RelationId((expense: Expense) => expense.category)
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.expenses)
  category: Category;

  @Column()
  amount: number;

  @Column()
  date: Date;
}
