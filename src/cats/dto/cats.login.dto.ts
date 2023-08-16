import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatsLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
