import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./modules/users/users.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { ClinicsModule } from "./modules/clinics/clinics.module";
import { PetsModule } from "./modules/pets/pets.module";
import { ConfigModule } from "@nestjs/config";
import { Clinic } from "./modules/clinics/clinic.model";
import { Pet } from "./modules/pets/pet.model";
import { Report } from "./modules/reports/report.model";
import { DoctorClinics } from "./modules/doctor-clinics/doctor-clinics.model";
import { User } from "./modules/users/user.model";
import { Session } from './modules/sessions/session.model';
import { AuthModule } from "./modules/auth/auth.module";
import {SessionsModule} from "./modules/sessions/sessions.module";
import {Doctor} from "./modules/doctors/doctor.model";
import {DoctorPets} from "./modules/doctor-pets/doctor-pets.model";
import {DoctorClinicsModule} from "./modules/doctor-clinics/doctor-clinics.module";

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
export class AppModule {}