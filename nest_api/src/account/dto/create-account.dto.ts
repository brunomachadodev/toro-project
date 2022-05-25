import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(14)
  public cpf: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
