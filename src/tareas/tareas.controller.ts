import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { CreateTareaDTO } from './dto/tareas.dto';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {

    constructor(private tareaService: TareasService){}


    // Listar todos los datos
    @Get('/list')
    async getTareas(@Res() res) {
        console.log('Se consultó todos los datos');
        const tarea = await this.tareaService.getTareas();
        return res.status(HttpStatus.OK).json(tarea);
    }


    // Listar un dato
    @Get('list/:tareaID')
    async getTarea(@Res() res, @Param('tareaID') tareaID){
        console.log('Consultó un dato ID:', tareaID);
        const tarea = await this.tareaService.getTarea(tareaID);
        if(!tarea) {
            throw new NotFoundException('Dato no existe');
        }
        return res.status(HttpStatus.OK).json(tarea);
    }


    // Crear un dato
    @Post('/create')
    async createTarea(@Res() res, @Body() createTareaDTO: CreateTareaDTO) {
        console.log('Una tarea se creó');
        const tarea = await this.tareaService.createTarea(createTareaDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Una tarea se ha creado',
            tarea
        });
    }


    // Editar un dato
    @Put('/update/:tareaID')
    async updateTarea(@Res() res, @Body() createTareaDTO: CreateTareaDTO, @Param('tareaID') tareaID) {
        console.log('Se actualizó ID:', tareaID);
        const updateTarea = await this.tareaService.updateTarea(tareaID, createTareaDTO);
        if (!updateTarea) {
            throw new NotFoundException('Tarea no encontrada');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Tarea actualizada',
            updateTarea
        });
    }


    // Borrado lógico
    @Delete('/delete/:tareaID')
    async softDeleteTarea(@Res() res, @Param('tareaID') tareaID) {
        console.log('Se cambia de estado a eliminado ID:', tareaID);
        const deletedTarea = await this.tareaService.softDeleteTarea(tareaID); // Borrado lógico
        if (!deletedTarea) {
            throw new NotFoundException('Tarea no encontrada');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Tarea marcada como eliminada',
            deletedTarea
        })
    }

    
    // Borrado físico
    @Delete('/deleteBD/:tareaID')
    async deleteTarea(@Res() res, @Param('tareaID') tareaID) {
        console.log('Se eliminó ID:', tareaID);
        const tareaDeleted = await this.tareaService.deleteTarea(tareaID); // Borrado físico
        if (!tareaDeleted) {
            throw new NotFoundException('Tarea no encontrada');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Tarea eliminada físicamente',
            tareaDeleted
        });
    }
}