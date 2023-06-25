import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repo';

@Injectable()
export class CarService {
  constructor(private carRepository: CarRepository) {}

  async getCars() {
    return this.carRepository.getCars();
  }

  async getOneCar(car_id) {
    const res = this.carRepository.getOneCar(car_id);
    return res;
  }

  async getCompanyId(companie) {
    const res = this.carRepository.getCompanyId(companie);
    return res;
  }

  async createCar(car, { id }) {
    let newCar = await this.carRepository.createCar(car, id);

    return {
      msg: 'Create car',
    };
  }

  async deleteCar(car, { id }) {
    const res = await this.carRepository.deleteCar(car, id);
    if (res.length == 0) {
      return { msg: 'Car topilmadi' };
    }

    return {
      msg: 'Car deleted!',
    };
  }

  async updateCar(car, updateCar, { id }) {
    let res = await this.carRepository.updateCar(car, updateCar, id);
    if (res.length == 0) {
      return {
        msg: 'Car not found!',
      };
    }

    return {
      msg: 'Car updated!',
    };
  }
}
