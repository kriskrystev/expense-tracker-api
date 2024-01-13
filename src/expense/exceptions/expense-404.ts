import { NotFoundException } from '@nestjs/common';

export class ExpenseNotFound extends NotFoundException {
  constructor(id: string) {
    super(`Expense with id ${id} doesn't exist`);
  }
}
