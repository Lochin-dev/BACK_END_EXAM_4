import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repo';
import { UserService } from './user.service';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
