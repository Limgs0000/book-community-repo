import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  utilities,
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';

const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'silly';
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  utilities.format.nestLike('MyApp', { prettyPrint: true }),
);

@Module({
  imports: [
    //info: .env 연결
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/../config/envs/.${process.env.NODE_ENV}.env`],
    }),

    //info: 윈스턴 모듈 등록
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: logLevel,
          format: logFormat,
        }),
        new winston.transports.File({
          dirname: `./logs/${moment(new Date()).format('YYYY-MM-DD')}`,
          filename: 'history.log',
          level: logLevel,
          format: logFormat,
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
