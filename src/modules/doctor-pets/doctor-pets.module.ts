import {Module} from "@nestjs/common";
import {DoctorPetsService} from "./doctor-pets.service";
import {DoctorPetsController} from "./doctor-pets.controller";

@Module({
    providers: [DoctorPetsService],
    controllers: [DoctorPetsController],
})
export class DoctorPetsModule {}
