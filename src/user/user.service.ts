import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getOneUser(user_id) {
    return this.userRepository.getOneUser(user_id);
  }

  async deleteAdminUser(user) {
    const res = await this.userRepository.deleteAdminUser(user);
    if (res.length == 0) {
      return { msg: 'User topilmadi' };
    }
    return {
      msg: 'User deleted!',
    };
  }

  async deleteUser(user) {
    const res = await this.userRepository.deleteUser(user);
    if (res.length == 0) {
      return { msg: 'User topilmadi' };
    }
    return {
      msg: 'User deleted!',
    };
  }

  async updateUser(user, updateUser) {
    let res = await this.userRepository.updateUser(user, updateUser);
    if (res.length == 0) {
      return {
        msg: 'User not found!',
      };
    }

    return {
      msg: 'User updated!',
    };
  }
}
