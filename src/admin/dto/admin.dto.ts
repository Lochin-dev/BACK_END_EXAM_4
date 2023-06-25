import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAdmin } from '../interface/admin.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class CurrentAdminDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class AdminDto implements IAdmin {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Enter your adminname',
    type: String,
    default: 'Lochin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Enter your adminemail',
    type: String,
    default: 'lochin@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Enter your adminpassword',
    type: String,
    default: 'lochin123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Enter your adminimg',
    type: String,
    default: 'lochin_img',
  })
  user_img: string;
}

export class RegisterAdminDto extends OmitType(AdminDto, ['id']) {}
export class DelIdDto extends PickType(AdminDto, ['id']) {}

export class LoginAdminDto extends PickType(AdminDto, ['email', 'password']) {}
