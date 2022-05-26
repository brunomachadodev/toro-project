import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AppErrorService } from 'src/utils/appError.service';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { findByCpfDto } from './dto/find-account.dto';
import { Account } from './entities/account.entity';
import { UtilsService } from './utils/utils.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly utilsService: UtilsService,
  ) {}
  private logger: Logger = new Logger(AccountController.name);

  @Post('create')
  @HttpCode(201)
  public async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Express.Response | Account> {
    try {
      const parsedData = createAccountDto;
      parsedData.cpf = this.utilsService.formatCpf(createAccountDto.cpf);

      if (!this.utilsService.validateCpf(parsedData.cpf))
        throw new AppErrorService('CPF não é válido.', 406);

      const accountUsingEmail = await this.accountService.findByEmail(
        parsedData.email,
      );

      const accountUsingCpf = await this.accountService.findByCpf(
        parsedData.cpf,
      );

      if (!accountUsingEmail && !accountUsingCpf) {
        const accountData = await this.accountService.handleAccountCreation(
          createAccountDto,
        );
        return accountData;
      } else {
        throw new AppErrorService(
          `Não foi possível criar uma nova conta. ${
            accountUsingEmail ? 'Email já cadastrado. ' : ''
          }${accountUsingCpf ? 'CPF já cadastrado.' : ''}`,
          409,
        );
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
            error: 'Erro ao buscar conta.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('find-by-cpf')
  public async findAccountByCpf(
    @Body() { cpf }: findByCpfDto,
  ): Promise<Account> {
    try {
      const parsedCpf = this.utilsService.formatCpf(cpf);

      const account = await this.accountService.findByCpf(parsedCpf);

      if (account) {
        delete account.created_at;
        return account;
      } else {
        throw new AppErrorService(
          'Não foi encontrada nenhuma conta com esse CPF.',
          404,
        );
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
            error: 'Erro ao buscar conta.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
