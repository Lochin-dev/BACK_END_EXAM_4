import { IsNotEmpty, IsString } from 'class-validator';
import { ICar } from '../interface/car.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class CarDto implements ICar {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    default: 'Mers',
  })
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    type: String,
    default: 'Mers_img',
  })
  car_img?: string;

  @ApiProperty({
    type: String,
    default: '300000',
  })
  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiProperty({
    type: String,
    default: 'bor',
  })
  @IsString()
  @IsNotEmpty()
  tanirovkasi?: string;

  @ApiProperty({
    type: String,
    default: '2021',
  })
  @IsString()
  @IsNotEmpty()
  year?: string;

  @ApiProperty({
    type: String,
    default: 'black',
  })
  @IsString()
  @IsNotEmpty()
  color?: string;

  @ApiProperty({
    type: String,
    default: '3.2',
  })
  @IsString()
  @IsNotEmpty()
  mator?: string;

  @ApiProperty({
    type: String,
    default: '40000 km',
  })
  @IsString()
  @IsNotEmpty()
  distance?: string;

  @ApiProperty({
    type: String,
    default: 'avtomat karapka',
  })
  @IsString()
  @IsNotEmpty()
  gearbook?: string;

  @ApiProperty({
    type: String,
    default: 'Alo',
  })
  @IsString()
  @IsNotEmpty()
  deseription?: string;

  @ApiProperty({
    type: String,
    default: '1bbb48a7-9b55-4e43-aa0d-4e7a7f6e2580',
  })
  @IsString()
  @IsNotEmpty()
  companie_id?: string;
}

export class CreateCArUpdateDto extends OmitType(CarDto, ['id']) {}

export class GetIdDto extends PickType(CarDto, ['id']) {}
