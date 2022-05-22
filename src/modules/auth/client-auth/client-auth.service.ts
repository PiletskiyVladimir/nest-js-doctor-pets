import { Injectable } from '@nestjs/common';
import { MainAuthService } from '../main/main-auth.service';
import { ClientService } from '../../client/client.service';

@Injectable()
export class ClientAuthService extends MainAuthService {
    constructor(private clientService: ClientService) {
        super(clientService);
    }
}
