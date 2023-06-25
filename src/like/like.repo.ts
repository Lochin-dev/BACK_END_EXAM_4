import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class LikeRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getLikes() {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('likes');
  }

  async getLikeUser({ id }) {
    const knex = this.knexConfig.instance;
    const myLikedCars = knex
      .column(
        { liked_id: 'l.id' },
        { user_id: 'u.id' },
        { user_name: 'u.name' },
        { user_image: 'u.image' },
        { car_id: 'c.id' },
        { car_title: 'c.title' },
        { car_image: 'c.outside_image' },
      )
      .select()
      .from('likes as l')
      .join('users as u', 'l.user_id', 'u.id')
      .join('cars as c', 'c.id', 'l.car_id')
      .where('u.id', id);
    return myLikedCars;
  }

  createLike(like, user_id) {
    const knex = this.knexConfig.instance;
    const { car_id } = like;

    return knex('likes').insert({
      car_id,
      user_id,
    });
  }

  getTekshir(like) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('likes').where(like);
  }

  deleteLike(like, user_id) {
    const knex = this.knexConfig.instance;
    const { car_id } = like;

    return knex('likes').returning('*').where({ car_id, user_id }).del();
  }
}
