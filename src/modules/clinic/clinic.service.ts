import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Clinic } from './clinic.model';
import { ClinicDto } from './dto/clinic.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ClinicService extends MainService<Clinic, ClinicDto, ClinicDto> {
    constructor(@InjectModel(Clinic) private clinicRepository: typeof Clinic) {
        super(clinicRepository);
    }
}
