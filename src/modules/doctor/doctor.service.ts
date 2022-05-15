import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Doctor } from './doctor.model';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from '../clinic/clinic.model';

@Injectable()
export class DoctorService extends MainService<Doctor, CreateDoctorDto, UpdateDoctorDto> {
    constructor(@InjectModel(Doctor) private doctorRepository: typeof Doctor) {
        super(doctorRepository);
    }
}
