import { Controller } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service.js';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}
}
