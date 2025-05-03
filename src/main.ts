import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger.config';
import { ConfigService } from '@nestjs/config';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AppExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService = app.get(ConfigService);
  const currentEnvironment = configService.get<string>(
    'NODE_ENV',
    'development',
  );
  const port = configService.get<number>('PORT', 3000);

  if (currentEnvironment !== 'production') {
    setupSwagger(app);
  }

  console.log(`Running in ${currentEnvironment} mode on port ${port}`);
  await app.listen(port);
}
bootstrap();
