import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class AdminRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getAdmins() {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('admin');
  }

  getOneAdmin(email) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('admin').where({ email });
  }

  async register(admin) {
    const knex = this.knexConfig.instance;
    await knex('users').returning('*').insert(admin);
    return knex('admin').returning('*').insert(admin);
  }

  login(admin) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('admin').where({ email: admin.email });
  }

  // deleteAdmin(admin) {
  //   const knex = this.knexConfig.instance;
  //   const { id } = admin;

  //   return knex('admin').returning('*').where({ id }).del();
  // }

  updateAdmin(admin, updateAdmin) {
    const knex = this.knexConfig.instance;

    const { id } = admin;

    return knex('admin').where({ id }).returning('*').update(updateAdmin);
  }
}
