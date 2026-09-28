import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { DEFAULT_EXCHANGE_RATES } from '../common/constants/default-exchange-rates.constant.js';

interface ExchangeRateApiResponse {
  base: string;
  rates: Record<string, number>;
}

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRate(currency: string): Promise<number> {
    if (currency === 'USD') return 1;

    const apiUrl = this.configService.get<string>('exchangeRate.apiUrl');
    const timeout = this.configService.get<number>('exchangeRate.timeout', 5000);

    if (!apiUrl) {
      this.logger.warn('Exchange rate API URL is not configured. Attempting to use fallback rate.');
      return this.getFallbackRate(currency);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<ExchangeRateApiResponse>(apiUrl, { timeout }).pipe(
          catchError((error: Error) => {
            this.logger.error(`External exchange rate API failed: ${error.message}`);
            throw error;
          }),
        ),
      );

      const rate = response.data?.rates?.[currency];
      if (rate === undefined || rate === null) {
        this.logger.warn(`Currency ${currency} not found in API response. Using fallback.`);
        return this.getFallbackRate(currency);
      }

      return rate;
    } catch (error) {
      this.logger.warn(`Failed to fetch exchange rate from API for ${currency}. Using fallback.`);
      return this.getFallbackRate(currency);
    }
  }

  private getFallbackRate(currency: string): number {
    const rate = DEFAULT_EXCHANGE_RATES[currency as keyof typeof DEFAULT_EXCHANGE_RATES];
    
    if (rate === undefined || rate === null) {
      this.logger.error(`No valid fallback exchange rate configured for this currency: ${currency}.`);
      throw new ServiceUnavailableException(`Exchange rate service unavailable and no fallback exists for ${currency}`);
    }

    return rate;
  }
}
