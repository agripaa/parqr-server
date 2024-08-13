import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserPayloadDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: any;
}
export class OperatorPayloadDto extends UserPayloadDto {
    @IsString()
    NIK: string;
}

export class OwnerPayloadDto extends UserPayloadDto {
    @IsString()
    @IsEmail()
    email: string;
}