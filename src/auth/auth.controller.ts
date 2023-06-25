import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

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

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(FileInterceptor('file', storage))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() user: RegisterDto,
    @UploadedFile() file,
  ): Promise<any> {
    // user.user_img = file.filename;

    return await this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }
}
