import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';
import { CreateUpdateUserDto, CurrentUserDto, GetIdDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/goard/goard.guard';
import { AdminGuard } from 'src/admin/goard/goard.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:id')
  async getOneUser(@Param() user: GetIdDto) {
    return await this.userService.getOneUser(user);
  }

  @UseGuards(AdminGuard)
  @Delete('/admin/:id')
  async deleteAdminUser(@Param() user: GetIdDto) {
    return await this.userService.deleteAdminUser(user);
  }

  @UseGuards(AuthGuard)
  @Delete('/logOut')
  async deleteUser(@CurrentUser() user: CurrentUserDto) {
    return await this.userService.deleteUser(user);
  }

  @UseGuards(AuthGuard)
  @Put('/update')
  async updateUser(
    @Body() updatedUser: CreateUpdateUserDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.userService.updateUser(user, updatedUser);
  }
}
