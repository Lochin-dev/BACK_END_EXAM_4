import { IsNotEmpty, IsString } from 'class-validator';
import { ICompanie } from '../interface/auth.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class CompanieDto implements ICompanie {
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
  title: string;

  @ApiProperty({
    type: String,
    default: 'companie_rasm',
  })
  companie_img: string;
}

export class CreateUpdateComDto extends OmitType(CompanieDto, ['id']) {}

export class GetIdComDto extends PickType(CompanieDto, ['id']) {}
