import { BadRequestException, Injectable } from '@nestjs/common';
import { ExchangeRateService } from '../../exchange-rate/exchange-rate.service.js';
import { COUNTRY_CURRENCY } from '../../common/constants/country-currency.constant.js';
import { PROFIT_MARGIN_PERCENTAGE } from '../../common/constants/price-calculation.constant.js';

@Injectable()
export class PriceCalculationService {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async calculatePrice(costUsd: number, supplierCountry: string) {
    const currency = COUNTRY_CURRENCY[supplierCountry as keyof typeof COUNTRY_CURRENCY];

    if (!currency) {
      throw new BadRequestException(`Unsupported supplier country: ${supplierCountry}`);
    }
    
    // Obtener la tasa de cambio actual usando como base USD
    const exchangeRate = await this.exchangeRateService.getRate(currency);

    // Calcular costo local y gaanancia
    const costLocal = Number((costUsd * exchangeRate).toFixed(2));
    const marginPercentage = PROFIT_MARGIN_PERCENTAGE;
    const marginMultiplier = 1 + (marginPercentage / 100);
    const sellingPriceLocal = Number((costLocal * marginMultiplier).toFixed(2));

    // Retornamos la respuesta
    return {
      cost_usd: Number(costUsd),
      exchange_rate: exchangeRate,
      cost_local: costLocal,
      margin_percentage: marginPercentage,
      selling_price_local: sellingPriceLocal,
      currency: currency,
      calculation_timestamp: new Date().toISOString(),
    };
  }
}
