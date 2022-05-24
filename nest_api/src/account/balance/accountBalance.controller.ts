import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from '../account.service';
import { AccountBalanceService } from './accountBalance.service';
import { CreateAccountBalanceDto } from './dto/create-accountBalance.dto';

@Controller('account/balance')
export class AccountBalanceController {
  constructor(
    private readonly accountBalanceService: AccountBalanceService,
    private readonly accountService: AccountService,
  ) {}

  @Post('create')
  public async incrementBalance(
    @Body() createAccountBalanceDto: CreateAccountBalanceDto,
    @Res() response: Response,
  ): Promise<Express.Response> {
    const account = await this.accountService.findById(
      createAccountBalanceDto.accountId,
    );

    if (account) {
      const accountTransaction =
        await this.accountBalanceService.handleBalanceAddition(
          createAccountBalanceDto,
        );

      return response.status(200).send({
        conta: accountTransaction.accountId,
        saldo: accountTransaction.balance,
        id_operacao: accountTransaction.id,
        data_da_transacao: accountTransaction.createdAt,
      });
    } else {
      return response.status(404).send({
        error: 'Conta não encontrada.',
      });
    }
  }
}
