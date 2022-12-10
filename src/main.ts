import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/setupSwagger';
import * as dotenv from 'dotenv';
import * as path from 'path';

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
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(process.env.MAIN_PORT);
  // await app.listen(3000);
}
bootstrap().then((res) => console.log(res));
