import { IsUUID, MaxLength, Min, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @MaxLength(255)
  description: string;

  @Min(0)
  amount: number;

  date: string;
}
