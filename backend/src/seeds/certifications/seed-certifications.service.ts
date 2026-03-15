import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import { readFile } from 'fs/promises';

import { Certification } from 'src/certifications/entities/certification.entity';

interface SeedCertification {
  name: string;
  shortDescription: string;
  description: string;
  passingScore?: number;
  modality?: string;
  durationHours?: number;
}

@Injectable()
export class SeedCertificationsService {
  private readonly logger = new Logger(SeedCertificationsService.name);

  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepository: Repository<Certification>,
  ) {}

  async run() {
    this.logger.log('Seeding: certificações');

    const filePath = join(__dirname, 'certifications-data.json');
    const file = await readFile(filePath, 'utf-8');
    const certifications: SeedCertification[] = JSON.parse(file);

    for (const cert of certifications) {
      const existing = await this.certificationRepository.findOne({ where: { name: cert.name } });
      if (existing) {
        this.logger.log(`Certificação já existe: ${cert.name}`);
        continue;
      }

      const newCertification = this.certificationRepository.create({
        name: cert.name,
        shortDescription: cert.shortDescription,
        description: cert.description,
        passingScore: cert.passingScore ?? 70,
        modality: cert.modality ?? 'online',
        durationHours: cert.durationHours ?? 1,
        isActive: true,
      });

      await this.certificationRepository.save(newCertification);
      this.logger.log(`Certificação criada: ${cert.name}`);
    }
  }
}
