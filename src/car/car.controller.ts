import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './car.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCArUpdateDto, CurrentUserDto, GetIdDto } from './dto/car.dto';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/admin/goard/goard.guard';
import { CurrentAdmin } from 'src/admin/userInfo/getUserDecorator';

export const storage = {
  storage: diskStorage({
    destination: './uploads/',
    filename: (_, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiBearerAuth()
@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async getCars() {
    return await this.carService.getCars();
  }

  @Get('/:id')
  async getOneCar(@Param() car: GetIdDto) {
    return await this.carService.getOneCar(car);
  }

  @Get('/:id')
  async getCompanyId(@Param() companie: GetIdDto) {
    return await this.carService.getCompanyId(companie);
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file', storage))
  async createCar(
    @Body() car: CreateCArUpdateDto,
    @CurrentAdmin() admin: CurrentUserDto,
    // @UploadedFile() file,
  ): Promise<any> {
    // car.car_img = file.filename;
    return await this.carService.createCar(car, admin);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteCar(
    @Param() car: GetIdDto,
    @CurrentAdmin() admin: CurrentUserDto,
  ) {
    return await this.carService.deleteCar(car, admin);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  async updateCar(
    @Param() car_id: GetIdDto,
    @Body() updatedCar: CreateCArUpdateDto,
    @CurrentAdmin() admin: CurrentUserDto,
  ) {
    return await this.carService.updateCar(car_id, updatedCar, admin);
  }
}
