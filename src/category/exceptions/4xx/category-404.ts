import { NotFoundException } from '@nestjs/common';

export class CategoryNotFound extends NotFoundException {
  constructor(id: string) {
    super(`Category with id ${id} not found`);
  }
}
