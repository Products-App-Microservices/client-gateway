import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';

import { EnvConfig } from './config/env';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfig ]
    }),
    ProductsModule,
    OrdersModule,
    NatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
