import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // You can replace * with your frontend domain (e.g., 'http://localhost:3000')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to send cookies or authorization headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
