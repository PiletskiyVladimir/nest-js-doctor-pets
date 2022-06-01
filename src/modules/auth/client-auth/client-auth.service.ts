import { Injectable } from '@nestjs/common';
import { MainAuthService } from '../main/main-auth.service';
import { ClientService } from '../../client/client.service';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { Client } from '../../client/client.model';

@Injectable()
export class ClientAuthService extends MainAuthService<{
    service: ClientService;
    dto: CreateClientDto;
}> {
    constructor() {
        super({
            dto: new CreateClientDto(),
            service: new ClientService(Client),
        });
    }
}
