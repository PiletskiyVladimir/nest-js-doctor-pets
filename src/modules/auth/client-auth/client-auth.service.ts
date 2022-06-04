import { Injectable } from '@nestjs/common';
import { MainAuthController } from '../main-auth/main-auth.controller';
import { ClientService } from '../../client/client.service';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { CreateDoctorDto } from '../../doctor/dto/create-doctor.dto';
import { Client } from '../../client/client.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientAuthService {}
