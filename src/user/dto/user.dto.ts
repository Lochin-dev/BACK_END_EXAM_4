import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../interface/user.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class UserDto implements IUser {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Enter your username',
    type: String,
    default: 'Lochin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Enter your useremail',
    type: String,
    default: 'lochin@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Enter your userpassword',
    type: String,
    default: 'lochin2212',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Enter your userimg',
    type: String,
    default: 'lochin_img',
  })
  @IsString()
  @IsNotEmpty()
  user_img: string;

  @ApiProperty({
    description: 'Enter your userrole',
    type: String,
    default: 'lochin_img',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class CreateUpdateUserDto extends OmitType(UserDto, ['id']) {}

export class GetIdDto extends PickType(UserDto, ['id']) {}
