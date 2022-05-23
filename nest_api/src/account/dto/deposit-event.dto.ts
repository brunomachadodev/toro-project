import { IsObject, IsString } from 'class-validator';

type bankInfo = {
  bank: string;
  branch: string;
};

type Target = bankInfo & {
  account: string;
};

type Origin = bankInfo & {
  cpf: string;
};

export class DepositEventDto {
  @IsString()
  public event: string;

  @IsObject()
  public target: Target;

  @IsString()
  public bank: Target['bank'];

  @IsString()
  public branch: Target['branch'];

  @IsString()
  public account: Target['account'];

  @IsObject()
  public origin: Origin;

  // @IsString()
  // public bank: Origin['bank'];

  // @IsString()
  // public branch: Origin['branch'];

  @IsString()
  public cpf: Origin['bank'];
}
