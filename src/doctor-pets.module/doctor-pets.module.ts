import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {DoctorPets} from "./doctor-pets.model";
import {DoctorPetsService} from "./doctor-pets.service";

@Module({
    controllers: [],
    providers: [DoctorPetsService],
    imports: [
        SequelizeModule.forFeature([DoctorPets])
    ],
    exports: [DoctorPetsService]
})
export class DoctorClinicsModule {
}
