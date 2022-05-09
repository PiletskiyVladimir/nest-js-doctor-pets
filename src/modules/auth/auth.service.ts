import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {ClientService} from "../client/client.service";

@Injectable()
export class AuthService {
    constructor(private clientService: ClientService, private jwtService: JwtService) {}

    public async login() {

    }

    public async logout() {

    }

    public async register() {

    }
}
