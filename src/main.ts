import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
