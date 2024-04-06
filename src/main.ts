import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('ClientGateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  app.useGlobalFilters(new RpcCustomExceptionFilter())
  
  await app.listen(process.env.PORT);

  logger.log(`Client gateway running on port ${ process.env.PORT }`);
}
bootstrap();
