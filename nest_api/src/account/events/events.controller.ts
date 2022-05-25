import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('account/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  private logger: Logger = new Logger(EventsController.name);

  @Post('deposit')
  public async createTransaction(@Body() depositDto: any) {
    try {
      if (depositDto.event === 'TRANSFER' || depositDto.event === 'PIX') {
        return await this.eventsService.handleTransferTransaction(depositDto);
      } else if (depositDto.event === 'DEPOSIT') {
        return await this.eventsService.handleDepositTransaction(depositDto);
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          error: 'Erro ao registrar transação.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
