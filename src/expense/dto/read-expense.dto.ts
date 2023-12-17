import { ReadCategoryDto } from 'src/category/dto/read-category.dto';

export class ReadExpenseDto {
  id: string;
  category: ReadCategoryDto;
  description: string;
  amount: number;
}
