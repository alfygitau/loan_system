import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './helpers/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
