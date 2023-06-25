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
import { CompanieService } from './companie.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateUpdateComDto,
  CurrentUserDto,
  GetIdComDto,
} from './dto/companie.dto';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
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
@ApiTags('Companie')
@Controller('companie')
export class CompanieController {
  authService: any;
  constructor(private companieService: CompanieService) {}

  @Get()
  async getCompanies() {
    return await this.companieService.getCompanies();
  }

  @Get('car/:id')
  async getComCars(@Param() companie: GetIdComDto) {
    return await this.companieService.getComCars(companie);
  }

  @Get('/:id')
  async getOneCompanie(@Param() companie: GetIdComDto) {
    return await this.companieService.getOneCompanie(companie);
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file', storage))
  async createCompanie(
    @Body() companie: CreateUpdateComDto,
    // @UploadedFile() file,
    @CurrentAdmin() admin: CurrentUserDto,
  ): Promise<any> {
    // companie.companie_img = file.filename;

    return await this.companieService.createCompanie(companie, admin);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteCompanie(
    @Param() companie: GetIdComDto,
    @CurrentAdmin() admin: CurrentUserDto,
  ): Promise<any> {
    return await this.companieService.deleteCompanie(companie, admin);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file', storage))
  async updateCompanie(
    @Param() companie_id: GetIdComDto,
    @Body() updatedCompanie: CreateUpdateComDto,
    @CurrentAdmin() admin: CurrentUserDto,
    // @UploadedFile() file,
  ): Promise<any> {
    // updatedCompanie.companie_img = file.filename;
    return await this.companieService.updateCompanie(
      companie_id,
      updatedCompanie,
      admin,
    );
  }
}
