import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';

import { EnvConfig } from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfig ]
    }),
    ProductsModule,
    OrdersModule,
    NatsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
