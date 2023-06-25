import { IsNotEmpty, IsString } from 'class-validator';
import { IBay } from '../interface/bay.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class BayDto implements IBay {
  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    default: '32932541-e297-4ce6-b323-bcce2523d8ba',
  })
  @IsString()
  @IsNotEmpty()
  car_id: string;
}

export class CreateUpdateDto extends OmitType(BayDto, ['id']) {}

export class GetIdDto extends PickType(BayDto, ['id']) {}
