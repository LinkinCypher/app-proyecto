import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { CreateTareaDTO } from './dto/tareas.dto';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {

    constructor(private tareaService: TareasService){}

    // listar todos los datos
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
            message: 'Un dato se ha creado',
            tarea
        });
    }

    //editar un dato localhost:3000/tareas/update?tareaID=#####
    @Put('/update')
    async updateTarea(@Res() res, @Body() createTareaDTO: CreateTareaDTO, @Query('tareaID') tareaID) {
        const updateTarea = await this.tareaService.updateTarea(tareaID, createTareaDTO);
        if (!updateTarea) throw new NotFoundException('Dato no existe');
        return res.status(HttpStatus.OK).json({
            message: 'Dato actualizado',
            updateTarea
        })
    }

    //eliminar un dato localhost:3000/tareas/delete?tareaID=#####
    @Delete('/delete')
    async deleteTarea(@Res() res, @Query('tareaID') tareaID) {
        const tareaDeleted = await this.tareaService.deleteTarea(tareaID);
        if (!tareaDeleted) throw new NotFoundException('Dato no existe');
        return res.status(HttpStatus.OK).json({
            message: 'Dato eliminado',
            tareaDeleted
        })
    }
}