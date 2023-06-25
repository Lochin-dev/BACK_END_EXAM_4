import { Module } from '@nestjs/common';
import { BayController } from './bay.controller';
import { BayService } from './bay.service';
import { BayRepository } from './bay.repo';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [BayController],
  providers: [BayService, BayRepository],
})
export class BayModule {}
