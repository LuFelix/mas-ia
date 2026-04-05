// seeds/activities/seed-activities.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import { readFile } from 'fs/promises';

// Importe a sua entidade Activity real aqui
import { Activity } from 'src/activities/entities/activity.entity'; 

interface SeedActivity {
  name: string;
  slug: string;
  category: string;
  difficultyLevel: string;
  hasAI: boolean;
  isActive: boolean;
  pdfPath?: string; 
  shortDescription: string;
  description: string;
  type: string;
  actionUrl: string;
  points: number;
}

@Injectable()
export class SeedActivitiesService {
  private readonly logger = new Logger(SeedActivitiesService.name);

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async run() {
    this.logger.log('Seeding: atividades e simuladores');

    const filePath = join(__dirname, 'activities-data.json');
    const file = await readFile(filePath, 'utf-8');
    const activities: SeedActivity[] = JSON.parse(file);

    for (const act of activities) {
      const existing = await this.activityRepository.findOne({ where: { name: act.name } });
      if (existing) {
        this.logger.log(`Atividade já existe: ${act.name}`);
        continue;
      }

      const newActivity = this.activityRepository.create({
        slug: act.slug,
        name: act.name,
        shortDescription: act.shortDescription,
        description: act.description,
        type: act.type,
        category: act.category,
        difficultyLevel: act.difficultyLevel,
        hasAI: act.hasAI,
        isActive: act.isActive,
        pdfPath: act.pdfPath || null
      });

      await this.activityRepository.save(newActivity);
      this.logger.log(`Atividade criada: ${act.name} [Tipo: ${act.type}]`);
    }
  }
}