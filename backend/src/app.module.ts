// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { GlobalJwtModule } from './shared/global-jwt.module';
import { SeedModule } from './seeds/seed.module';
import { QuestionsModule } from './questions/questions.module';
import { CertificationsModule } from './certifications/certifications.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ExamsModule } from './exams/exams.module';
import { CertificatesModule } from './certificates/certificates.module';
import { SuiService } from './sui/sui.service';
import { ActivitiesModule } from './activities/activities.module';
import { WealthGrowthModule } from './simulators/wealth-growth/wealth-growth.module'; 
import { ArenaInvestmentsModule } from './simulators/arena-investments/arena-investments.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: config.get('MAIL_PORT') == 465, // true para 465, false para outras
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: config.get('MAIL_FROM'),
        },
      }),
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    GlobalJwtModule,
    SeedModule,
    QuestionsModule,
    CertificationsModule,
    EnrollmentsModule,
    ExamsModule,
    CertificatesModule,
    ActivitiesModule,
    WealthGrowthModule,
    ArenaInvestmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
