import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUpdateDto, CurrentUserDto, GetIdDto } from './dto/like.dto';
import { AuthGuard } from 'src/auth/goard/goard.guard';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get()
  async getLikes() {
    return await this.likeService.getLikes();
  }

  @UseGuards(AuthGuard)
  @Get('/save')
  async getLikeUser(@CurrentUser() user: CurrentUserDto) {
    return await this.likeService.getLikeUser(user);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createLike(
    @Body() like: CreateUpdateDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.likeService.createLike(like, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteLike(
    @Param() like: GetIdDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.likeService.deleteLike(like, user);
  }
}
