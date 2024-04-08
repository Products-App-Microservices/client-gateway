import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';

import { ORDERS_MICROSERVICE } from 'src/config/services';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
