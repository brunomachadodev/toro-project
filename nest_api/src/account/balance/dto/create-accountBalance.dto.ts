import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateAccountBalanceDto {
  @IsNotEmpty()
  @IsNumberString()
  public accountId: number;

  @IsNotEmpty()
  @IsNumber()
  public balance: number;
}
