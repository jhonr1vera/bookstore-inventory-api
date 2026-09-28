import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service.js';
import { BooksController } from './books.controller.js';
import { BooksRepository } from './books.repository.js';
import { Book } from './entities/book.entity.js';
import { PriceCalculationService } from './services/price-calculation.service.js';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), ExchangeRateModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, PriceCalculationService],
  exports: [BooksService],
})
export class BooksModule {}
