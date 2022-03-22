import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Session} from "./session.model";

@Module({
  controllers: [],
  providers: [SessionsService],
  imports: [SequelizeModule.forFeature([Session])],
  exports: [SessionsService]
})
export class SessionsModule {}
