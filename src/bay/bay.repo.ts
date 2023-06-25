import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class BayRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getBays() {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('bays');
  }

  async getBayUser(user) {
    const knex = this.knexConfig.instance;
    const { id } = user;

    let bay = await knex.returning('*').from('bays').where({ user_id: id });
    const myBayCars = knex
      .column(
        { bay_id: 'b.id' },
        { user_id: 'u.id' },
        { user_name: 'u.name' },
        { user_image: 'u.user_img' },
        { car_id: 'c.id' },
        { car_title: 'c.title' },
        { car_image: 'c.car_img' },
      )
      .select()
      .from('bays as b')
      .join('users as u', 'b.user_id', 'u.id')
      .join('cars as c', 'c.id', 'b.car_id')
      .where('u.id', id);
    return myBayCars;
  }

  createBay(bay, user_id) {
    const knex = this.knexConfig.instance;
    const { car_id } = bay;

    return knex('bays').insert({
      car_id,
      user_id,
    });
  }

  deleteBay(bay, user_id) {
    const knex = this.knexConfig.instance;
    const { id } = bay;

    return knex('bays').returning('*').where({ user_id, id }).del();
  }
}
