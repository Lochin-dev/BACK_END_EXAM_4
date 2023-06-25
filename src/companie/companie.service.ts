import { Injectable } from '@nestjs/common';
import { CompanieRepository } from './companie.repo';

@Injectable()
export class CompanieService {
  constructor(private companieRepository: CompanieRepository) {}

  async getCompanies() {
    return this.companieRepository.getCompanies();
  }

  getComCars(companie) {
    const res = this.companieRepository.getComCars(companie);
    return res;
  }

  async getOneCompanie(companie) {
    const res = this.companieRepository.getOneCompanie(companie);
    return res;
  }

  async createCompanie(companie, { id }) {
    let newCompanie = await this.companieRepository.createCompanie(
      companie,
      id,
    );

    return {
      msg: 'Create companie',
    };
  }

  async deleteCompanie(companie, { id }) {
    const res = await this.companieRepository.deleteCompanie(companie, id);

    if (res === 0) {
      return { msg: 'Companie topilmadi' };
    }

    return {
      msg: 'Companie deleted!',
    };
  }

  async updateCompanie(companie, updateCompanie, { id }) {
    let res = await this.companieRepository.updateCompanie(
      companie,
      updateCompanie,
      id,
    );
    if (res.length == 0) {
      return {
        msg: 'Companie not found!',
      };
    }

    return {
      msg: 'Companie updated!',
    };
  }
}
