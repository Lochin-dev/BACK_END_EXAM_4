import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class UserRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getUsers() {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('users');
  }

  getOneUser(user_id) {
    const knex = this.knexConfig.instance;
    const { id } = user_id;
    return knex.select('*').from('users').where({ id });
  }

  async deleteAdminUser(user) {
    const knex = this.knexConfig.instance;
    const { id } = user;
    await knex('bays').returning('*').where({ user_id: id }).del();
    await knex('likes').returning('*').where({ user_id: id }).del();

    return knex('users').returning('*').where({ id }).del();
  }

  async deleteUser(user) {
    const knex = this.knexConfig.instance;
    const { id } = user;
    await knex('bays').returning('*').where({ user_id: id }).del();
    await knex('likes').returning('*').where({ user_id: id }).del();

    return knex('users').returning('*').where({ id }).del();
  }

  updateUser(user, updateUser) {
    const knex = this.knexConfig.instance;
    const { id } = user;

    return knex('users').where({ id }).returning('*').update(updateUser);
  }
}
