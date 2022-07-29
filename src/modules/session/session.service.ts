import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Session } from './session.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SessionService extends MainService<Session> {
    constructor(@InjectModel(Session) private sessionRepository: typeof Session) {
        super(sessionRepository);
    }
}
