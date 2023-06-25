import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repo';
import { AdminService } from './admin.service';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [AdminController],
  providers: [AdminRepository, AdminService],
})
export class AdminModule {}
