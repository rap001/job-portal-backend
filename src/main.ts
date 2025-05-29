import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_URL, // <--- This is the crucial line!
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Include all HTTP methods you use
    credentials: true, // Set to true if you are sending cookies or authorization headers (e.g., JWT)
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
