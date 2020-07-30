import { Controller, Get, Post, Body, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { MessageDto } from 'src/class/Message/message-dto';
import { MessageService } from 'src/services/message-service/message.service';
import { response } from 'express';

@Controller('mensajes')
export class MensajesController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    createMessage(@Body() createMessageDto: MessageDto, @Res() response) {
        this.messageService.createMessage(createMessageDto)
            .then((mensaje) => {
                response.status(HttpStatus.CREATED).json(mensaje);
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: "Error al crear" })
            });
    };

    @Get()
    getAll(@Res() response) {
        this.messageService.getAll()
            .then((mensajes) => {
                response.status(HttpStatus.OK).json(mensajes)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: "Error al obtener mensajes" })
            })
    };

    @Get(':id')
    getByID(@Res() response, @Param() id) {
        this.messageService.getByID(id)
            .then((mensaje) => {
                response.status(HttpStatus.OK).json(mensaje)
            })
            .catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({ message: "Error al obtener mensajes" })
            })
    };

    @Put(':id')
    updateMessage(@Body() updateMessageDto: MessageDto, @Res() response, @Param('id') id:number) {
        this.messageService.updateMessage(id,updateMessageDto)
        .then((mensaje)=>{
            response.status(HttpStatus.OK).json(mensaje);
        })
        .catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({ message: "Error al actualizar mensaje" })
        })
    }

    @Delete(':id')
    deleteMessage(@Param('id') id, @Res() response) {
        this.messageService.deleteMessage(id)
        .then(()=>{
            response.status(HttpStatus.OK).json({message:"Mensaje con id: "+id+" eliminado"})
        })
        .catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({ message: "Error al eliminar mensaje" })
        })
    }
}