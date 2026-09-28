import { COUNTRY_CURRENCY } from './country-currency.constant.js'

export type SupportedCountry = keyof typeof COUNTRY_CURRENCY;
export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_CURRENCY) as Array<SupportedCountry>;