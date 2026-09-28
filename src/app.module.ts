import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module.js';
import configuration from './config/configuration.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('database.url');

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            ssl: { rejectUnauthorized: false },
            synchronize: configService.get<boolean>('database.synchronize'),
            autoLoadEntities: true,
          };
        }

        // Desarrollo local con campos individuales
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          synchronize: configService.get<boolean>('database.synchronize'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    BooksModule,
    ExchangeRateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
