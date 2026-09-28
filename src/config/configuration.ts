import { isDevelopment } from '../common/helpers/env.helper.js';

export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    url: process.env.DATABASE_URL,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || isDevelopment(),
  },
  exchangeRate: {
    apiUrl: process.env.EXCHANGE_RATE_API_URL,
    timeout: parseInt(process.env.EXCHANGE_RATE_TIMEOUT || '5000', 10),
  },
});

