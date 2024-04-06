import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_MICROSERVICE } from 'src/config/services';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCTS_MICROSERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow<string>('PRODUCTS_MICROSERVICE_HOST'),
            port: configService.getOrThrow<number>('PRODUCTS_MIRCOSERVICE_PORT'),
          }
        })
      }
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
