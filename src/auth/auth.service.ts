import { AuthRepository } from './auth.repo';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(user) {
    let { email } = user;
    const res = await this.authRepository.getOneUser(email);
    if (res.length !== 0) {
      return { msg: "User oldin registratsiyadan o'tgan" };
    }

    user.password = await bcrypt.hash(user.password, 10);
    await this.authRepository.register(user);
    return { msg: 'User registed' };
  }

  async login(user) {
    let result = await this.authRepository.login(user);

    if (result.length == 0) {
      return {
        msg: 'User not found!',
      };
    }

    result = result[0];

    let checkPsw = await bcrypt.compare(user.password, result.password);
    if (!checkPsw) {
      return {
        msg: 'Password invalid!',
      };
    }

    let token = await this.jwtService.sign({ id: result.id });
    return {
      msg: 'OK',
      token,
    };
  }
}
