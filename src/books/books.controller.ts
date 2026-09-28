import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';
import { SearchCategoryQueryDto } from './dto/search-category-query.dto.js';
import { LowStockQueryDto } from './dto/low-stock-query.dto.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('search')
  searchByCategory(@Query() query: SearchCategoryQueryDto) {
    return this.booksService.findByCategory(query.category);
  }

  @Get('low-stock')
  findLowStock(@Query() query: LowStockQueryDto) {
    return this.booksService.findLowStock(query.threshold);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.booksService.findAll(query.page, query.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }

  @Post(':id/calculate-price')
  calculatePrice(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.calculatePrice(id);
  }
}
