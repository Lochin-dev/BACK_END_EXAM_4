import { Module } from '@nestjs/common';
import { CompanieController } from './companie.controller';
import { CompanieService } from './companie.service';
import { CompanieRepository } from './companie.repo';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [CompanieController],
  providers: [CompanieService, CompanieRepository],
})
export class CompanieModule {}
