import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './helpers/ExceptionFilter';
import * as crypto from 'crypto';
(global as any).crypto = crypto;

async function startServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
startServer();
