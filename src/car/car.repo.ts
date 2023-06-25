import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class CarRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCars() {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('cars');
  }

  getOneCar(car_id) {
    const knex = this.knexConfig.instance;
    const { id } = car_id;
    return knex.select('*').from('cars').where({ id });
  }

  getCompanyId(companie) {
    const knex = this.knexConfig.instance;
    const { id } = companie;
    return knex.select('*').from('cars').where({ companie_id: id });
  }

  createCar(car, admin_id) {
    const knex = this.knexConfig.instance;
    const {
      title,
      car_img,
      price,
      tanirovkasi,
      year,
      color,
      mator,
      distance,
      gearbook,
      deseription,
      companie_id,
    } = car;

    return knex('cars').insert({
      title,
      car_img,
      price,
      tanirovkasi,
      year,
      color,
      mator,
      distance,
      gearbook,
      deseription,
      companie_id,
      admin_id,
    });
  }

  async deleteCar(car, admin_id) {
    const knex = this.knexConfig.instance;
    const { id } = car;

    await knex('likes').returning('*').where({ car_id: id }).del();
    return knex('cars').returning('*').where({ admin_id, id }).del();
  }

  updateCar(car, updateCar, admin_id) {
    const knex = this.knexConfig.instance;

    const { id } = car;

    return knex('cars')
      .where({ admin_id, id })
      .returning('*')
      .update(updateCar);
  }
}
