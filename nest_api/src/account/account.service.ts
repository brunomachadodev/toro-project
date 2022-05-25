import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountBalanceService } from './balance/accountBalance.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly accountBalanceService: AccountBalanceService,
  ) {}

  public async handleAccountCreation(
    createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    const account = await this.create(createAccountDto);
    if (account)
      await this.accountBalanceService.handleBalanceAddition({
        accountId: account.id,
        balance: 0,
      });

    return account;
  }

  private async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(account);
  }

  public async findByEmail(email: string): Promise<Account> {
    return await this.accountRepository.findOneBy({ email });
  }

  public async findByCpf(cpf: string): Promise<Account> {
    return await this.accountRepository.findOneBy({ cpf });
  }

  public async findById(id: number): Promise<Account> {
    return await this.accountRepository.findOneBy({ id });
  }
}
