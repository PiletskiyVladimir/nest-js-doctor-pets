import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './client.model';

@Module({
    controllers: [ClientController],
    providers: [ClientService],
    imports: [SequelizeModule.forFeature([Client])],
    exports: [ClientService],
})
export class ClientModule {}
