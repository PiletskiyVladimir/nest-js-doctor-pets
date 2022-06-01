import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { DisabledTokens } from './disabled-tokens.model';
import { DisabledTokenDto } from './dto/disabled-token.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DisabledTokensService extends MainService<DisabledTokens, DisabledTokenDto, DisabledTokenDto> {
    constructor(@InjectModel(DisabledTokens) private disabledTokensRepository: typeof DisabledTokens) {
        super(disabledTokensRepository);
    }
}
