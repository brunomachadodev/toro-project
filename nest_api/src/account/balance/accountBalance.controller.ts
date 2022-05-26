import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post
} from '@nestjs/common';
import { AppErrorService } from 'src/utils/appError.service';
import { AccountService } from '../account.service';
import { AccountBalanceService } from './accountBalance.service';
import { CreateAccountBalanceDto } from './dto/create-accountBalance.dto';

@Controller('account/balance')
export class AccountBalanceController {
  constructor(
    private readonly accountBalanceService: AccountBalanceService,
    private readonly accountService: AccountService,
  ) {}
  private logger: Logger = new Logger(AccountBalanceController.name);

  @Post('create')
  public async incrementBalance(
    @Body() createAccountBalanceDto: CreateAccountBalanceDto,
  ): Promise<Express.Response> {
    try {
      const account = await this.accountService.findById(
        createAccountBalanceDto.accountId,
      );

      if (account) {
        const accountTransaction =
          await this.accountBalanceService.handleBalanceAddition(
            createAccountBalanceDto,
          );

        return {
          conta: accountTransaction.accountId,
          saldo: accountTransaction.balance,
          id_operacao: accountTransaction.id,
          data_da_transacao: accountTransaction.createdAt,
        };
      } else {
        throw new AppErrorService('Conta não encontrada.', 404);
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      if (error instanceof AppErrorService) {
        throw new HttpException(
          {
            error: error.message,
          },
          error.statusCode,
        );
      } else {
        throw new HttpException(
          {
            error: 'Erro ao registrar entrada de saldo.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
