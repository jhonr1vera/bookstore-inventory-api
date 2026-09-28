import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookCategory } from '../enums/book-category.enum.js';

export class SearchCategoryQueryDto {
  @IsEnum(BookCategory, { message: `Category must be an existing one: ${Object.values(BookCategory).join(', ')}` })
  @IsNotEmpty()
  category: BookCategory;
}
