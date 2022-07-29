import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Client } from './client.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClientService extends MainService<Client> {
    constructor(@InjectModel(Client) private clientRepository: typeof Client) {
        super(clientRepository);
    }
}
