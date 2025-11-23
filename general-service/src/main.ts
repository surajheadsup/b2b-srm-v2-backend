import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('app.apiPrefix') || 'generalservice';
  app.setGlobalPrefix(apiPrefix);
  
  app.useGlobalFilters(new AllExceptionsFilter());
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) => Object.values(error.constraints || {}).join(', '),
        );
        return new BadRequestException(messages);
      },
    }),
  );

  app.enableCors();

  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port);
  
  console.log(`🚀 Server running: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();