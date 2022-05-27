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
  @IsOptional()
  @IsNumberString()
  public bank: string;

  @IsOptional()
  @IsNumberString()
  public branch: string;

  @IsOptional()
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
  public origin?: Origin;

  @IsNumber()
  public amount: number;
}

export class TransferEventDto {
  @IsNotEmpty()
  @IsString()
  public event: string;

  @IsNotEmptyObject()
  @Type(() => Target)
  @ValidateNested()
  public target: Target;

  @IsNotEmptyObject()
  @Type(() => Origin)
  @ValidateNested()
  public origin: Origin;

  @IsNumber()
  public amount: number;
}
