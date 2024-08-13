import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

class AuthPayloadDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class OperatorPayloadDto extends AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  NIK: string;
}

export class OwnerPayloadDto extends AuthPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class OperatorSignPayloadDto extends AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  NIK: string;
}

export class OwnerSignInPayloadDto extends AuthPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
