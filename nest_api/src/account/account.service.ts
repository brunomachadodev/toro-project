import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(account);
  }

  public async checkIfEmailExists(email: string): Promise<boolean> {
    const emailExists = await this.accountRepository.findOneBy({ email });

    if (!emailExists) {
      return false;
    } else {
      return true;
    }
  }

  public async checkIfCpfExists(cpf: string): Promise<boolean> {
    const cpfExists = await this.findByCpf(cpf);

    if (!cpfExists) {
      return false;
    } else {
      return true;
    }
  }

  public async findByCpf(cpf: string) {
    return await this.accountRepository.findOneBy({ cpf });
  }

  public async findById(id: number) {
    return await this.accountRepository.findOneBy({ id });
  }
}
