import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MensajesController} from './Controllers/mensajes/mensajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './services/message-service/message.service';
import { Message } from './models/Message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjs',
      password: '1234',
      database: 'sendmeapp_db',
      entities: [__dirname+"/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message])
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MessageService],
})
export class AppModule {}
