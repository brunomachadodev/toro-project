import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public formatCPF(cpf: string) {
    return cpf.replace(/[^\d]/g, '');
  }
}
