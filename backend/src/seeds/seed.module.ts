// seeds/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Certification } from 'src/certifications/entities/certification.entity';
import { SeedService } from './seed.service';
import { SeedUsersService } from './users/seed-users.service';
import { SeedCertificationsService } from './certifications/seed-certifications.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Role, User, Certification]),
  ],
  providers: [SeedService, SeedUsersService, SeedCertificationsService],
  exports: [SeedService],
})
export class SeedModule {}