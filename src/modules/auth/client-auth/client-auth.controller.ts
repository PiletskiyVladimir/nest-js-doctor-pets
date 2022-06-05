import { Controller } from '@nestjs/common';
import { MainAuthController } from '../main-auth/main-auth.controller';
import { ClientService } from '../../client/client.service';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { JwtService } from '@nestjs/jwt';
import { Client } from '../../client/client.model';

@Controller('client-auth')
export class ClientAuthController extends MainAuthController<{
    service: ClientService;
    dto: CreateClientDto;
}> {
    constructor(protected jwtService: JwtService) {
        super(
            {
                dto: new CreateClientDto(),
                service: new ClientService(Client),
            },
            jwtService
        );
    }
}
