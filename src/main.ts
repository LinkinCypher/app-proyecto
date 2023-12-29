import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // Importa dotenv

async function bootstrap() {
  
  dotenv.config(); // Carga las variables de entorno desde el archivo .env

  const port = process.env.PORT || 3000; // Lee el puerto de la variable de entorno o usa 3000 por defecto
  
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para todas las solicitudes desde http://localhost:8100
  app.enableCors({
    origin: 'http://localhost:8100', // Reemplaza con la URL de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(port);
  console.log(`La aplicación se está ejecutando en: http://localhost:${port}`);
}
bootstrap();
