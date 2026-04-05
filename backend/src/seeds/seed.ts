// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeedService);

  try {
    await seeder.run();
    console.log('Seeding completo!');
  } catch (error) {
    console.error('Ocorreu um erro durante o seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap();