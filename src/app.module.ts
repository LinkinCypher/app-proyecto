import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasModule } from './tareas/tareas.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [TareasModule, MongooseModule.forRoot('mongodb://localhost/proyecto')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
