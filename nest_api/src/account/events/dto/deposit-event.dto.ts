import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

class Target {
  @IsNotEmpty()
  @IsNumberString()
  public bank: string;

  @IsNotEmpty()
  @IsNumberString()
  public branch: string;

  @IsNotEmpty()
  @IsNumberString()
  public account: string;
}

class Origin {
  @IsNotEmpty()
  @IsNumberString()
  public bank: string;

  @IsNotEmpty()
  @IsNumberString()
  public branch: string;

  @IsNotEmpty()
  @IsNumberString()
  public cpf: string;
}

export class DepositEventDto {
  @IsNotEmpty()
  @IsString()
  public event: string;

  @IsNotEmptyObject()
  @Type(() => Target)
  @ValidateNested()
  public target: Target;

  @IsOptional()
  @Type(() => Origin)
  @ValidateNested()
  public origin: Origin;

  @IsNumber()
  public amount: number;
}
