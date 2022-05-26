import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public formatCpf(cpf: string) {
    return cpf.replace(/[^\d]/g, '');
  }

  public validateCpf(inputCpf: string) {
    let sum = 0;
    let remainder: number;

    if (inputCpf == '00000000000') return false;
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(inputCpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(inputCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(inputCpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(inputCpf.substring(10, 11))) return false;
    return true;
  }
}
