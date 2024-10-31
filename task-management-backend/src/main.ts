import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('TASKS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
