import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Pet } from './pet.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PetService extends MainService<Pet> {
    constructor(@InjectModel(Pet) private petRepository: typeof Pet) {
        super(petRepository);
    }
}
