import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repo';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
