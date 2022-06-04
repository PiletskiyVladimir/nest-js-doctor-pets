import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './doctor.model';

@Module({
    controllers: [DoctorController],
    providers: [DoctorService],
    imports: [SequelizeModule.forFeature([Doctor])],
    exports: [DoctorService],
})
export class DoctorModule {}
