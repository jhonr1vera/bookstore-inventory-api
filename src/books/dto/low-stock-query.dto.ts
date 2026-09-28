import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional } from 'class-validator';

export class LowStockQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  threshold: number = 10;
}
