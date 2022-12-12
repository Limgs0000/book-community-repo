import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/setupSwagger';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : process.env.NODE_ENV === 'stage'
      ? '.stage.env'
      : '.development.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  setupSwagger(app);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap().then(() => console.log('Server Run!'));
