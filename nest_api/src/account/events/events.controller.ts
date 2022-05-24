import { Body, Controller, Post } from '@nestjs/common';
import { DepositEventDto } from './dto/deposit-event.dto';

@Controller('account/events')
export class EventsController {
  @Post('deposit')
  public async createTransaction(@Body() depositDto: DepositEventDto) {
    return depositDto;
  }
}
