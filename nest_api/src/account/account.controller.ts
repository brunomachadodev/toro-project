import { Body, Controller, Post, Res } from '@nestjs/common';
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
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Res() response,
  ): Promise<Express.Response | Account> {
    const parsedData = createAccountDto;
    parsedData.cpf = this.utilsService.formatCPF(createAccountDto.cpf);

    console.log('CONTROLLER');
    const isEmailUsed = await this.accountService.checkIfEmailExists(
      parsedData.email,
    );
    const isCpfUsed = await this.accountService.checkIfCpfExists(
      parsedData.cpf,
    );

    console.log(isEmailUsed);
    console.log(isCpfUsed);

    if (!isEmailUsed && !isCpfUsed) {
      const log = await this.accountService.create(createAccountDto);

      console.log(' CHEGOU');
      console.log(log);
      return response.status(200).send(log);
    } else {
      return response.status(409).send({
        error: `Não foi possível criar uma nova conta. ${
          isEmailUsed ? 'Email já cadastrado.' : ''
        }${isCpfUsed ? 'CPF já cadastrado.' : ''}`,
      });
    }
  }

  @Post('find')
  async findAccountByCpf(cpf: string) {
    const parsedCpf = this.utilsService.formatCPF(cpf);

    const account = this.accountService.findByCpf(parsedCpf);

    if (account) {
      return
    }
  }
}
