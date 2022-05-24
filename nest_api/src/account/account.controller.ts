import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { UtilsService } from './utils/utils.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly utilsService: UtilsService,
  ) {}

  @Post('create')
  public async create(
    @Body() createAccountDto: CreateAccountDto,
    @Res() response: Response,
  ): Promise<Express.Response | Account> {
    const parsedData = createAccountDto;
    parsedData.cpf = this.utilsService.formatCPF(createAccountDto.cpf);

    const isEmailUsed = await this.accountService.checkIfEmailExists(
      parsedData.email,
    );
    const isCpfUsed = await this.accountService.checkIfCpfExists(
      parsedData.cpf,
    );

    if (!isEmailUsed && !isCpfUsed) {
      const accountData = await this.accountService.handleAccountCreation(
        createAccountDto,
      );
      return response.status(201).send(accountData);
    } else {
      return response.status(409).send({
        error: `Não foi possível criar uma nova conta. ${
          isEmailUsed ? 'Email já cadastrado. ' : ''
        }${isCpfUsed ? 'CPF já cadastrado.' : ''}`,
      });
    }
  }

  @Post('find')
  public async findAccountByCpf(cpf: string) {
    const parsedCpf = this.utilsService.formatCPF(cpf);

    const account = this.accountService.findByCpf(parsedCpf);

    if (account) {
      return;
    }
  }
}
