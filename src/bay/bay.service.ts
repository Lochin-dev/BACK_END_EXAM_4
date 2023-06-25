import { Injectable } from '@nestjs/common';
import { BayRepository } from './bay.repo';

@Injectable()
export class BayService {
  constructor(private bayRepository: BayRepository) {}

  async getBays() {
    return this.bayRepository.getBays();
  }

  async getBayUser(user) {
    return this.bayRepository.getBayUser(user);
  }

  async createBay(bay, { id }) {
    let newBay = await this.bayRepository.createBay(bay, id);

    return {
      msg: 'bay',
    };
  }

  async deleteBay(bay, { id }) {
    const res = await this.bayRepository.deleteBay(bay, id);
    if (res.length == 0) {
      return { msg: 'No bay' };
    }

    return {
      msg: 'Bay deleted!',
    };
  }
}
