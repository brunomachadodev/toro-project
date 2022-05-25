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

  public async handleBalanceAddition(
    createAccountBalanceDto: CreateAccountBalanceDto,
  ) {
    try {
      const actualBalance = await this.findAccountLastBalance(
        createAccountBalanceDto.accountId,
      );

      if (!actualBalance) {
        return await this.create(createAccountBalanceDto);
      } else {
        createAccountBalanceDto.balance =
          +createAccountBalanceDto.balance + +actualBalance.balance;
        return await this.create(createAccountBalanceDto);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private async create(
    createAccountBalanceDto: CreateAccountBalanceDto,
  ): Promise<AccountBalance> {
    const transaction = this.accountBalanceRepository.create(
      createAccountBalanceDto,
    );
    return await this.accountBalanceRepository.save(transaction);
  }

  private async findAccountLastBalance(
    accountId: number,
  ): Promise<AccountBalance> {
    return await this.accountBalanceRepository.findOne({
      where: { accountId: accountId },
      order: { id: 'desc' },
    });
  }
}
