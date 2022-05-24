import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountBalanceController } from './balance/accountBalance.controller';
import { AccountBalance } from './balance/accountBalance.entity';
import { AccountBalanceService } from './balance/accountBalance.service';
import { Account } from './entities/account.entity';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountBalance])],
  controllers: [AccountController, AccountBalanceController, EventsController],
  providers: [
    AccountService,
    UtilsService,
    AccountBalanceService,
    EventsService,
  ],
})
export class AccountModule {}
