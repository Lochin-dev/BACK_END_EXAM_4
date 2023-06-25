import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repo';
import { KnexConfig } from '../KnexConfig/knexConfig';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthRepository, KnexConfig],
  controllers: [AuthController],
})
export class AuthModule {}
