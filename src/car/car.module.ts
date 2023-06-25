import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRepository } from './car.repo';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
