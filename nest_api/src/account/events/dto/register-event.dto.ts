import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator';

export class RegisterEventDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumberString()
  @IsOptional()
  originBank?: string;

  @IsNumberString()
  @IsOptional()
  originBranch?: string;
}
