import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service.js';
import { BooksController } from './books.controller.js';
import { BooksRepository } from './books.repository.js';
import { Book } from './entities/book.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksService],
})
export class BooksModule {}
