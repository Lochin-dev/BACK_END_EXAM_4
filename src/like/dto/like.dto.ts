import { IsNotEmpty, IsString } from 'class-validator';
import { ILike } from '../interface/like.interface';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
}

export class LikeDto implements ILike {
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

export class CreateUpdateDto extends OmitType(LikeDto, ['id']) {}

export class GetIdDto extends PickType(LikeDto, ['car_id']) {}
