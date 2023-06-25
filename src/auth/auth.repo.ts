import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

@Injectable()
export class AuthRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getOneUser(email) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('users').where({ email });
  }

  register(user) {
    const knex = this.knexConfig.instance;
    return knex('users').returning('*').insert(user);
  }

  login(user) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('users').where({ email: user.email });
  }

  getUserByEmail(useR_email) {}
}
