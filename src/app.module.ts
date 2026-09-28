import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module.js';

@Module({
  imports: [BooksModule, ExchangeRateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
