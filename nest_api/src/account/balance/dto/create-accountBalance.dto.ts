import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  public accountId: number;

  @IsNotEmpty()
  @IsNumber()
  public balance: number;
}
