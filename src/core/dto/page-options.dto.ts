import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../enum/order.enum';
import { Type } from 'class-transformer';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsOptional()
  take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
