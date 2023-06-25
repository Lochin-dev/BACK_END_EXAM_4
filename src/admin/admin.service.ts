import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from './admin.repo';

@Injectable()
export class AdminService {
  constructor(
    private adminRepository: AdminRepository,
    private jwtService: JwtService,
  ) {}

  async getAdmins() {
    return this.adminRepository.getAdmins();
  }

  async register(admin) {
    let { email } = admin;
    const res = await this.adminRepository.getOneAdmin(email);
    if (res.length !== 0) {
      return { msg: "Admin oldin registratsiyadan o'tgan" };
    }

    admin.password = await bcrypt.hash(admin.password, 10);
    await this.adminRepository.register(admin);
    return { msg: 'Admin registed' };
  }

  async login(admin) {
    let result = await this.adminRepository.login(admin);
    if (result.length == 0) {
      return {
        msg: 'Admin not found!',
      };
    }

    result = result[0];

    let checkPsw = await bcrypt.compare(admin.password, result.password);
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

  // async deleteAdmin(admin) {
  //   const res = await this.adminRepository.deleteAdmin(admin);
  //   if (res.length == 0) {
  //     return { msg: 'Admin topilmadi' };
  //   }

  //   return {
  //     msg: 'Admin deleted!',
  //   };
  // }

  async updateAdmin(admin, updateAdmin) {
    let res = await this.adminRepository.updateAdmin(admin, updateAdmin);
    if (res.length == 0) {
      return {
        msg: 'Admin not found!',
      };
    }

    return {
      msg: 'Admin updated!',
    };
  }
}
