import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountBalance } from './accountBalance.entity';
import { CreateAccountBalanceDto } from './dto/create-accountBalance.dto';

@Injectable()
export class AccountBalanceService {
  constructor(
    @InjectRepository(AccountBalance)
    private readonly accountBalanceRepository: Repository<AccountBalance>,
  ) {}

  public async create(
    createAccountBalanceDto: CreateAccountBalanceDto,
  ): Promise<AccountBalance> {
    console.log(createAccountBalanceDto);

    const transaction = this.accountBalanceRepository.create(
      createAccountBalanceDto,
    );
    console.log('TRANSACTION');
    console.log(transaction);
    return await this.accountBalanceRepository.save(transaction);
  }
}
