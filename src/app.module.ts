import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env';
import { ProductsModule } from './products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_MICROSERVICE } from './config/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfig ]
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
