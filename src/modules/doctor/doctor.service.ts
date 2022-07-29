import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Doctor } from './doctor.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DoctorService extends MainService<Doctor> {
    constructor(@InjectModel(Doctor) private doctorRepository: typeof Doctor) {
        super(doctorRepository);
    }
}
