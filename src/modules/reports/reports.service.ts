import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Report } from './report.model';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReportsService extends MainService<Report, CreateReportDto, UpdateReportDto> {
    constructor(@InjectModel(Report) private reportRepository: typeof Report) {
        super(reportRepository);
    }
}
