import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClientService extends MainService<Client, CreateClientDto, UpdateClientDto> {
    constructor(@InjectModel(Client) private clientRepository: typeof Client) {
        super(clientRepository);
    }
}
