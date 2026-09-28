import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ExchangeRateService } from './exchange-rate.service.js';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}

