import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import * as process from 'process';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';

@Controller()
export class AppController {
  private readonly log = new Logger(AppController.name);

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly log2: WinstonLogger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('log')
  getLog(): string {
    const dto = {
      name: 'Max',
      email: 'maxx1234@gmail.com',
      password: '1234',
    };

    const aaa = 'test~~';

    this.log.error('Error', dto);
    this.log.warn('warn', dto);


    return 'LogTest';
  }

  @Get('port')
  getPort() {
    console.log(1);
    return process.env.SERVER_PORT;
  }
}
