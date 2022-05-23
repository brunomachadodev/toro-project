import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountBalanceController } from './balance/accountBalance.controller';
import { AccountBalance } from './balance/accountBalance.entity';
import { AccountBalanceService } from './balance/accountBalance.service';
import { Account } from './entities/account.entity';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountBalance])],
  controllers: [AccountController, AccountBalanceController],
  providers: [AccountService, UtilsService, AccountBalanceService],
})
export class AccountModule {}
