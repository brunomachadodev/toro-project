import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public formatCpf(cpf: string) {
    return cpf.replace(/[^\d]/g, '');
  }
}
