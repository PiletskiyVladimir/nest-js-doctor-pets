import {Module} from "@nestjs/common";
import {DoctorClinicsController} from "./doctor-clinics.controller";

@Module({
    controllers: [DoctorClinicsController],
})
export class DoctorClinicsModule {}
