import { Injectable, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/models/Message/message.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/class/Message/message-dto';
import { create } from 'domain';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) { }

    async getAll():Promise<Message[]> {
        return await this.messageRepository.find();
    }
    
    async getByID(id:number):Promise<Message>{
        return await this.messageRepository.findOne(id);
    }

    async createMessage(createMessage: MessageDto):Promise<Message> {
        
        const newMessage = new Message();
        newMessage.message = createMessage.message;
        newMessage.nick = createMessage.nick;
        
        return this.messageRepository.save(newMessage);
    }

    async updateMessage(id:number, updateMessage: MessageDto):Promise<Message>{
        
        const update = await this.messageRepository.findOne(id);
        update.nick = updateMessage.nick;
        update.message = updateMessage.message;

        return this.messageRepository.save(update);
    }

    async deleteMessage(id:number):Promise<any>{
        return await this.messageRepository.delete(id);
    }
    
}
