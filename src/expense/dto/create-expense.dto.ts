import { IsUUID, MaxLength } from 'class-validator';

export class CreateExpenseDto {
  @IsUUID()
  categoryId: string;

  @MaxLength(255)
  description: string;

  amount: number;

  date: Date;
}
