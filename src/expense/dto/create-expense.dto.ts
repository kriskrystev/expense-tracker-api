import { IsUUID, MaxLength, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsUUID()
  categoryId: string;

  @MaxLength(255)
  description: string;

  @Min(0)
  amount: number;

  date: string;
}
