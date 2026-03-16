// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { InvitesModule } from './invites/invites.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { GlobalJwtModule } from './shared/global-jwt.module';
import { AdminModule } from './admin/admin.module';
import { SeedModule } from './seeds/seed.module';
import { QuestionsModule } from './questions/questions.module';
import { CertificationsModule } from './certifications/certifications.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ExamsModule } from './exams/exams.module';
import { CertificatesModule } from './certificates/certificates.module';
import { SuiService } from './sui/sui.service';
import { ActivitiesModule } from './activities/activities.module';
import { WealthGrowthModule } from './simulators/wealth-growth/wealth-growth.module'; 

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
    AuthModule,
    RolesModule,
    UsersModule,
    InvitesModule,
    MailerModule,
    GlobalJwtModule,
    AdminModule,
    SeedModule,
    QuestionsModule,
    CertificationsModule,
    EnrollmentsModule,
    ExamsModule,
    CertificatesModule,
    ActivitiesModule,
    WealthGrowthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService, SuiService],
})
export class AppModule {}
