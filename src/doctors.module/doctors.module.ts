import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {SessionsModule} from "../sessions.module/sessions.module";
import {DoctorsController} from "./doctors.controller";
import {DoctorsService} from "./doctors.service";
import {Doctor} from "./doctor.model";

@Module({
    controllers: [DoctorsController],
    providers: [DoctorsService],
    imports: [
        SessionsModule,
        SequelizeModule.forFeature([Doctor])
    ],
    exports: [DoctorsService]
})
export class DoctorsModule {
}
