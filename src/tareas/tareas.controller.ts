import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { CreateTareaDTO } from './dto/tareas.dto';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {

    constructor(private tareaService: TareasService){}

    // listar todos los datos localhost:3000/tareas/list
    @Get('/list')
    async getTareas(@Res() res) {
        const tarea = await this.tareaService.getTareas();
        return res.status(HttpStatus.OK).json(tarea);
    }

    //listar un dato localhost:3000/######
    @Get('/:taskID')
    async getTarea(@Res() res, @Param('tareaID') tareaID){
        const tarea = await this.tareaService.getTarea(tareaID);
        if(!tarea) throw new NotFoundException('Dato no existe');
        return res.status(HttpStatus.OK).json(tarea);
    }

    //crear un dato
    @Post('/create')
    async createTarea(@Res() res, @Body() createTareaDTO: CreateTareaDTO) {
        const tarea = await this.tareaService.createTarea(createTareaDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Una tarea se ha creado',
            tarea
        });
    }

    //editar un dato localhost:3000/tareas/update/######
    @Put('/update/:tareaID')
    async updateTarea(@Res() res, @Body() createTareaDTO: CreateTareaDTO, @Param('tareaID') tareaID) {
        const updateTarea = await this.tareaService.updateTarea(tareaID, createTareaDTO);
        if (!updateTarea) throw new NotFoundException('Tarea no encontrada');
        return res.status(HttpStatus.OK).json({
            message: 'Tarea actualizada',
            updateTarea
        });
    }

    //eliminar un dato localhost:3000/tareas/delete/######
    @Delete('/deleteBD/:tareaID')
    async deleteTarea(@Res() res, @Param('tareaID') tareaID) {
        const tareaDeleted = await this.tareaService.deleteTarea(tareaID); // Borrado físico
        if (!tareaDeleted) throw new NotFoundException('Tarea no encontrada');
        return res.status(HttpStatus.OK).json({
            message: 'Tarea eliminada físicamente',
            tareaDeleted
        });
    }

    //borrado lógico localhost:3000/tareas/delete/######
    @Delete('/delete/:tareaID')
    async softDeleteTarea(@Res() res, @Param('tareaID') tareaID) {
        const deletedTarea = await this.tareaService.softDeleteTarea(tareaID); // Borrado lógico
        if (!deletedTarea) throw new NotFoundException('Tarea no encontrada');
        return res.status(HttpStatus.OK).json({
            message: 'Tarea marcada como eliminada',
            deletedTarea
        })
    }
}