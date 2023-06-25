import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { KnexConfigModule } from './KnexConfig/Knex.module';
import { AuthRepository } from './auth/auth.repo';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { CompanieController } from './companie/companie.controller';
import { CompanieService } from './companie/companie.service';
import { CompanieModule } from './companie/companie.module';
import { CompanieRepository } from './companie/companie.repo';
import { CarModule } from './car/car.module';
import { AdminModule } from './admin/admin.module';
import { LikeModule } from './like/like.module';
import { BayModule } from './bay/bay.module';

@Module({
  imports: [
    AuthModule,
    KnexConfigModule,
    UserModule,
    CompanieModule,
    CarModule,
    AdminModule,
    LikeModule,
    BayModule,
  ],
  controllers: [AuthController, CompanieController],
  providers: [
    AppService,
    AuthService,
    AuthRepository,
    CompanieService,
    CompanieRepository,
  ],
})
export class AppModule {}
