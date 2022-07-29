import { Injectable } from '@nestjs/common';
import MainService from '../../core/main.service';
import { Report } from './report.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReportsService extends MainService<Report> {
    constructor(@InjectModel(Report) private reportRepository: typeof Report) {
        super(reportRepository);
    }
}
