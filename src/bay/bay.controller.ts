import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BayService } from './bay.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUpdateDto, CurrentUserDto, GetIdDto } from './dto/bay.dto';
import { AuthGuard } from 'src/auth/goard/goard.guard';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('Bay')
@Controller('bay')
export class BayController {
  constructor(private bayService: BayService) {}

  @Get()
  async getBays() {
    return await this.bayService.getBays();
  }

  @UseGuards(AuthGuard)
  @Get('/savad')
  async asyBayUser(@CurrentUser() user: CurrentUserDto) {
    return await this.bayService.getBayUser(user);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createBay(
    @Body() bay: CreateUpdateDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.bayService.createBay(bay, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteBay(@Param() bay: GetIdDto, @CurrentUser() user: CurrentUserDto) {
    return await this.bayService.deleteBay(bay, user);
  }
}
