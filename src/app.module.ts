import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasModule } from './tareas/tareas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config(); // Carga las variables de entorno desde el archivo .env

@Module({
  imports: [
    TareasModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}