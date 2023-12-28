import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tarea } from './interfaces/tareas.interfaces';
import { CreateTareaDTO } from './dto/tareas.dto';

@Injectable()
export class TareasService {
constructor(@InjectModel('Tareas') private readonly tareaModel: Model<Tarea>) {}

    // Obtener todos los datos
    async getTareas(): Promise<Tarea[]>{
        const tareas = await this.tareaModel.find()
        return tareas;
    }

    // Obtener solo un dato por ID
    async getTarea(tareaID: string): Promise<Tarea>{
        const tarea = await this.tareaModel.findById(tareaID);
        return tarea;
    }

    // Crear un dato
    async createTarea(createTareaDTO: CreateTareaDTO): Promise<Tarea>{
        const tarea = new this.tareaModel(createTareaDTO);
        return await tarea.save();
    }

    // Editar un dato por ID
    async updateTarea(tareaID: string, createTareaDTO: CreateTareaDTO): Promise<Tarea>{
        const updateTarea = await this.tareaModel.findByIdAndUpdate(tareaID, createTareaDTO, {new: true});
        return updateTarea;
    }

    // Eliminar un dato
    async deleteTarea(tareaID: string): Promise<any>{
        const deleteTarea = await this.tareaModel.findByIdAndDelete(tareaID);
        return deleteTarea;
    }

    // Eliminar un dato de forma lógica
    async softDeleteTarea(tareaID: string): Promise<Tarea> {
        const updateData = { deleted: true }; // Actualizar el campo deleted a true
        const deletedTarea = await this.tareaModel.findByIdAndUpdate(tareaID, updateData, { new: true });
        return deletedTarea;
    }
}