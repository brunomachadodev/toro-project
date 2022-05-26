import { IsNotEmpty, IsString } from 'class-validator';

export class findByCpfDto {
  @IsNotEmpty()
  @IsString()
  cpf: string;
}
