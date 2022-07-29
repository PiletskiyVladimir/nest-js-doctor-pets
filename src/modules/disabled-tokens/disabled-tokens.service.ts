import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { DisabledTokens } from './disabled-tokens.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DisabledTokensService extends MainService<DisabledTokens> {
    constructor(@InjectModel(DisabledTokens) private disabledTokensRepository: typeof DisabledTokens) {
        super(disabledTokensRepository);
    }
}
