import { Body, Controller, Post, Res } from '@nestjs/common';
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
  async incrementBalance(
    @Body() CreateAccountBalanceDto: CreateAccountBalanceDto,
    @Res() response,
  ): Promise<Express.Response> {
    const account = await this.accountService.findById(
      CreateAccountBalanceDto.accountId,
    );

    console.log(account);

    if (account) {
      const accountTransaction = await this.accountBalanceService.create(
        CreateAccountBalanceDto,
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
