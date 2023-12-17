import { ReadCategoryDto } from 'src/category/dto/read-category.dto';
import { Category } from 'src/category/entities/category.entity';

export class ReadExpenseDto {
  id: string;
  category: ReadCategoryDto | string;
  description: string;
  amount: number;
}
