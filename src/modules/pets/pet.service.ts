import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Pet } from './pet.model';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorClinics } from '../doctor-clinics/doctor-clinics.model';

@Injectable()
export class PetService extends MainService<Pet, CreatePetDto, UpdatePetDto> {
    constructor(@InjectModel(Pet) private petRepository: typeof Pet) {
        super(petRepository);
    }
}
