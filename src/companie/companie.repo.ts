import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class CompanieRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCompanies() {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('companies');
  }

  getComCars(companie) {
    const knex = this.knexConfig.instance;
    const { id } = companie;
    return knex.select('*').from('cars').where({ companie_id: id });
  }

  getOneCompanie(companie) {
    const knex = this.knexConfig.instance;

    const { id } = companie;

    return knex.select('*').from('companies').where({ id });
  }

  createCompanie(companie, admin_id) {
    const knex = this.knexConfig.instance;
    const { title, companie_img } = companie;

    return knex('companies').insert({
      title,
      companie_img,
      admin_id,
    });
  }

  async deleteCompanie(companie, admin_id) {
    const knex = this.knexConfig.instance;
    const { id } = companie;

    // DELETE-1

    return knex.transaction(async (trx) => {
      await trx('likes')
        .whereIn('car_id', function () {
          this.select('id').from('cars').where('companie_id', id);
        })
        .del();
      await trx('bays')
        .whereIn('car_id', function () {
          this.select('id').from('cars').where('companie_id', id);
        })
        .del();
      await trx('cars').where('companie_id', id).del();
      return await trx('companies').where('id', id).del();
    });

    // DELETE-2
    const cars = await knex.select('*').from('cars').where({ companie_id: id });
    for (let i = 0; i < cars.length; i++) {
      let id = cars[i].id;
      knex('likes').returning('*').where({ car_id: id }).del();
      knex('bays').returning('*').where({ car_id: id }).del();
    }
    await knex('cars').returning('*').where({ companie_id: id }).del();
    return knex('companies').returning('*').where({ admin_id, id }).del();
  }

  updateCompanie(companie, updateCompanie, admin_id) {
    const knex = this.knexConfig.instance;

    const { id } = companie;

    return knex('companies')
      .where({ admin_id, id })
      .returning('*')
      .update(updateCompanie);
  }
}
