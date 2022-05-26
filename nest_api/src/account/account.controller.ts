import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
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
  public async create(
    @Body() createAccountDto: CreateAccountDto,
    @Res() response: Response,
  ): Promise<Express.Response | Account> {
    const parsedData = createAccountDto;
    parsedData.cpf = this.utilsService.formatCpf(createAccountDto.cpf);

    if (!this.utilsService.validateCpf(parsedData.cpf))
      throw new HttpException(
        { error: 'CPF não é válido.' },
        HttpStatus.NOT_ACCEPTABLE,
      );

    const accountUsingEmail = await this.accountService.findByEmail(
      parsedData.email,
    );

    const accountUsingCpf = await this.accountService.findByCpf(parsedData.cpf);

    if (!accountUsingEmail && !accountUsingCpf) {
      const accountData = await this.accountService.handleAccountCreation(
        createAccountDto,
      );
      return response.status(201).send(accountData);
    } else {
      return response.status(409).send({
        error: `Não foi possível criar uma nova conta. ${
          accountUsingEmail ? 'Email já cadastrado. ' : ''
        }${accountUsingCpf ? 'CPF já cadastrado.' : ''}`,
      });
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
      this.logger.error(error);
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
