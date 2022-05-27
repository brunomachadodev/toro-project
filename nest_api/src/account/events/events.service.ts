import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppErrorService } from 'src/utils/appError.service';
import { Repository } from 'typeorm';
import { AccountService } from '../account.service';
import { AccountBalanceService } from '../balance/accountBalance.service';
import { AccountTransactions } from '../entities/account_transactions.entity';
import { UtilsService } from '../utils/utils.service';
import { DepositEventDto } from './dto/deposit-event.dto';
import { RegisterEventDto } from './dto/register-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(AccountTransactions)
    private readonly accountTransactionsRepository: Repository<AccountTransactions>,
    private readonly accountService: AccountService,
    private readonly utilsService: UtilsService,
    private readonly accountBalanceService: AccountBalanceService,
  ) {}

  public async handleTransferTransaction(transferDto: DepositEventDto) {
    if (
      !transferDto.origin.bank ||
      !transferDto.origin.branch ||
      !transferDto.origin.cpf
    ) {
      throw new AppErrorService(
        'Ausência de informações do banco de origem.',
        400,
      );
    }

    transferDto.origin.cpf = this.utilsService.formatCpf(
      transferDto.origin.cpf,
    );

    const account = await this.accountService.findById(
      +transferDto.target.account,
    );

    if (!account) {
      throw new AppErrorService(
        'Não foi possível encontrar nenhuma conta com o id informado.',
        404,
      );
    }

    if (account?.id === +transferDto.target.account) {
      const eventPayload = {
        type: transferDto.event,
        accountId: account.id,
        amount: transferDto.amount,
        originBank: transferDto.origin.bank,
        originBranch: transferDto.origin.branch,
      };

      const transaction = await this.registerEvent(eventPayload).then(() =>
        this.accountBalanceService.handleBalanceAddition({
          accountId: account.id,
          balance: transferDto.amount,
        }),
      );

      return transaction;
    } else {
      throw new AppErrorService(
        'CPF de origem não correspondente ao da conta.',
        403,
      );
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

      try {
        const transaction = await this.registerEvent(eventPayload).then(() =>
          this.accountBalanceService.handleBalanceAddition({
            accountId: account.id,
            balance: depositDto.amount,
          }),
        );

        return transaction;
      } catch (error) {
        throw new AppErrorService('Erro ao registrar transação.', 500);
      }
    } else {
      throw new AppErrorService(
        'Não foi possível encontrar nenhuma conta com o id informado.',
        404,
      );
    }
  }

  private async registerEvent(
    registerEventDto: RegisterEventDto,
  ): Promise<AccountTransactions> {
    const eventCreated =
      this.accountTransactionsRepository.create(registerEventDto);

    return await this.accountTransactionsRepository.save(eventCreated);
  }
}
