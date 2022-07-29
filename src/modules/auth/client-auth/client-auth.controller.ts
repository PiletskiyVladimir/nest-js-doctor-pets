import { Controller } from '@nestjs/common';
import { MainAuthController } from '../main-auth/main-auth.controller';
import { ClientService } from '../../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from '../../client/client.model';

@Controller('client-auth')
export class ClientAuthController extends MainAuthController<ClientService> {
    constructor(protected jwtService: JwtService) {
        super(new ClientService(Client), jwtService);
    }
}
