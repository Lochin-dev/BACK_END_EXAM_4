import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  AdminDto,
  CurrentAdminDto,
  DelIdDto,
  LoginAdminDto,
  RegisterAdminDto,
} from './dto/admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/goard/goard.guard';
import { AdminGuard } from './goard/goard.guard';
import { CurrentAdmin } from './userInfo/getUserDecorator';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAdmins() {
    return await this.adminService.getAdmins();
  }

  @Post('/register')
  async register(@Body() user: RegisterAdminDto) {
    return await this.adminService.register(user);
  }

  @Post('/login')
  async login(@Body() admin: LoginAdminDto) {
    return await this.adminService.login(admin);
  }

  // @UseGuards(AdminGuard)
  // @Delete('/logOut')
  // async deleteAdmin(@CurrentAdmin() admin: CurrentAdminDto) {
  //   return await this.adminService.deleteAdmin(admin);
  // }

  @UseGuards(AdminGuard)
  @Put('/update')
  async updateAdmin(
    @CurrentAdmin() admin: CurrentAdminDto,
    @Body() updatedAdmin: RegisterAdminDto,
  ) {
    return await this.adminService.updateAdmin(admin, updatedAdmin);
  }
}
