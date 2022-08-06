import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fullstack Bootcamp recipes api')
    .setDescription('This is KIT fullstack bootcamp food recipes api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
