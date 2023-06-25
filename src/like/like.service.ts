import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repo';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async getLikes() {
    return this.likeRepository.getLikes();
  }

  async getLikeUser(user) {
    return this.likeRepository.getLikeUser(user);
  }

  async createLike(like, { id }) {
    let car = await this.likeRepository.getTekshir(like);

    if (car.length > 0) {
      await this.likeRepository.deleteLike(like, id);
      return { msg: 'Dis like' };
    }

    let newLike = await this.likeRepository.createLike(like, id);
    return {
      msg: 'like',
    };
  }

  async deleteLike(like, { id }) {
    const res = await this.likeRepository.deleteLike(like, id);
    if (res.length == 0) {
      return { msg: 'No like' };
    }

    return {
      msg: 'Like deleted!',
    };
  }
}
