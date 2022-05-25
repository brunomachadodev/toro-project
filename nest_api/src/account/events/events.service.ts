import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../account.service';
import { AccountBalanceService } from '../balance/accountBalance.service';
import { AccountTransactions } from '../entities/account_transactions.entity';
import { UtilsService } from '../utils/utils.service';
import { DepositEventDto, TransferEventDto } from './dto/deposit-event.dto';
import { RegisterEventDto } from './dto/register-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(AccountTransactions)
    private readonly accountTransactionsRepository: Repository<AccountTransactions>,
    private readonly accountService: AccountService,
    private readonly utilsService: UtilsService,
    private readonly accountBalaanceService: AccountBalanceService,
  ) {}

  public async handleTransferTransaction(transferDto: TransferEventDto) {
    transferDto.origin.cpf = this.utilsService.formatCPF(
      transferDto.origin.cpf,
    );
    const account = await this.accountService.findByCpf(transferDto.origin.cpf);

    if (account?.id === +transferDto.target.account) {
      const eventPayload = {
        type: transferDto.event,
        accountId: account.id,
        amount: transferDto.amount,
        originBank: transferDto.origin.bank,
        originBranch: transferDto.origin.branch,
      };

      const transaction = await this.registerEvent(eventPayload).then(() =>
        this.accountBalaanceService.handleBalanceAddition({
          accountId: account.id,
          balance: transferDto.amount,
        }),
      );

      return transaction;
    }
  }

  public async handleDepositTransaction(depositDto: DepositEventDto) {
    const account = await this.accountService.findById(
      +depositDto.target.account,
    );
    if (account) {
      const eventPayload = {
        accountId: account.id,
        amount: depositDto.amount,
        type: depositDto.event,
      };

      return await this.registerEvent(eventPayload);
    } else {
      throw new Error('Erro ao registrar transação.');
    }
  }

  private async registerEvent(
    registerEventDto: RegisterEventDto,
  ): Promise<AccountTransactions> {
    console.log(registerEventDto);
    const eventCreated =
      this.accountTransactionsRepository.create(registerEventDto);

    console.log(eventCreated);

    return await this.accountTransactionsRepository.save(eventCreated);
  }
}
