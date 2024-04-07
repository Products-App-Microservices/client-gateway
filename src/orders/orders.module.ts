import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { ORDERS_MICROSERVICE } from 'src/config/services';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ORDERS_MICROSERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: ( configService: ConfigService ) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow<string>('ORDERS_MICROSERVICE_HOST'),
            port: configService.getOrThrow<number>('ORDERS_MIRCOSERVICE_PORT'),
          }
        })
      }
    ]),
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
