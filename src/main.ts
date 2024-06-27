import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Teste Empreende Aqui API - MS Accounts')
    .setDescription('API para gerenciamento de contas bancárias e pedidos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
