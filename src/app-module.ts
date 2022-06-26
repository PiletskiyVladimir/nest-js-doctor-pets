import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Client } from './modules/client/client.model';
import { Pet } from './modules/pets/pet.model';
import { Doctor } from './modules/doctor/doctor.model';
import { DoctorClinics } from './modules/doctor-clinics/doctor-clinics.model';
import { Clinic } from './modules/clinic/clinic.model';
import { Report } from './modules/reports/report.model';
import { DisabledTokens } from './modules/disabled-tokens/disabled-tokens.model';
import { ClientAuthModule } from './modules/auth/client-auth/client-auth.module';
import { DoctorAuthModule } from './modules/auth/doctor-auth/doctor-auth.module';

@Module({
    providers: [],
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Client, Pet, Doctor, DoctorClinics, Clinic, Report, DisabledTokens],
            autoLoadModels: true,
            logging: true,
        }),
        ClientAuthModule,
        DoctorAuthModule,
    ],
    exports: [],
})
export class AppModule {}
