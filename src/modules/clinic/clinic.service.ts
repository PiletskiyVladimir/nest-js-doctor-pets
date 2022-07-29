import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Clinic } from './clinic.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClinicService extends MainService<Clinic> {
    constructor(@InjectModel(Clinic) private clinicRepository: typeof Clinic) {
        super(clinicRepository);
    }
}
