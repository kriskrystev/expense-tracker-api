import { Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 255)
  name: string;

  @Length(1, 255)
  description: string;
}
