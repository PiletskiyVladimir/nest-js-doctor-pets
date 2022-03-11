import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { ClinicsModule } from "./clinics/clinics.module";
import { PetsModule } from "./pets/pets.module";
import { ConfigModule } from "@nestjs/config";
import { Clinic } from "./clinics/clinic.model";
import { Pet } from "./pets/pet.model";
import { Report } from "./reports/report.model";
import { DoctorClinics } from "./doctor-clinics/doctor-clinics.model";
import { User } from "./users/user.model";
import { Session } from './sessions/session.model';
import { AuthModule } from "./auth/auth.module";
import {SessionsModule} from "./sessions/sessions.module";
import {Doctor} from "./doctors/doctor.model";
import {DoctorPets} from "./doctor-pets/doctor-pets.model";

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
        AuthModule
    ],
    exports: []
})
export class AppModule {}