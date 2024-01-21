import { Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(2, 255)
  name: string;

  @Length(2, 255)
  description: string;
}
