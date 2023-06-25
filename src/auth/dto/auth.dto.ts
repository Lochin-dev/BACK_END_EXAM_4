import { IsEmail, IsString } from 'class-validator';
import { IAuth } from '../interface/auth.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class UserDto implements IAuth {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Enter your username',
    type: String,
    default: 'Lochin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Enter your useremail',
    type: String,
    default: 'lochinbek@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Enter your userpassword',
    type: String,
    default: 'lochin2212',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Enter your userimg',
    type: String,
    default: 'lochin_img',
  })
  @IsString()
  user_img: string;
}

export class RegisterDto extends OmitType(UserDto, ['id']) {}

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}
