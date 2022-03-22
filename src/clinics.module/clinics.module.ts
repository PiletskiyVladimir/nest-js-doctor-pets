import {Module} from '@nestjs/common';
import {ClinicsController} from './clinics.controller';
import {ClinicsService} from './clinics.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Clinic} from "./clinic.model";

@Module({
    controllers: [ClinicsController],
    providers: [ClinicsService],
    imports: [
        SequelizeModule.forFeature([Clinic])
    ],
    exports: [ClinicsService]
})
export class ClinicsModule {
}
