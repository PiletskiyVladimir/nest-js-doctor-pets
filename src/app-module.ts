import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./users.module/users.module";
import {ReportsModule} from "./reports.module/reports.module";
import {ClinicsModule} from "./clinics.module/clinics.module";
import {PetsModule} from "./pets.module/pets.module";
import {ConfigModule} from "@nestjs/config";
import {Clinic} from "./clinics.module/clinic.model";
import {Pet} from "./pets.module/pet.model";
import {Report} from "./reports.module/report.model";
import {DoctorClinics} from "./doctor-clinics.module/doctor-clinics.model";
import {User} from "./users.module/user.model";
import {Session} from './sessions.module/session.model';
import {AuthModule} from "./auth.module/auth.module";
import {SessionsModule} from "./sessions.module/sessions.module";
import {Doctor} from "./doctors.module/doctor.model";
import {DoctorPets} from "./doctor-pets.module/doctor-pets.model";
import {DoctorClinicsModule} from "./doctor-clinics.module/doctor-clinics.module";

@Module({
    providers: [],
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Clinic, Pet, Report, DoctorClinics, DoctorPets, User, Session, Doctor],
            autoLoadModels: true,
            logging: false
        }),
        UsersModule,
        ReportsModule,
        SessionsModule,
        ClinicsModule,
        PetsModule,
        AuthModule,
        DoctorClinicsModule
    ],
    exports: []
})
export class AppModule {
}