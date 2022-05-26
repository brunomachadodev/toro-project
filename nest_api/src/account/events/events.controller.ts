import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post
} from '@nestjs/common';
import { AppErrorService } from 'src/utils/appError.service';
import { EventsService } from './events.service';

@Controller('account/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  private logger: Logger = new Logger(EventsController.name);

  @Post('deposit')
  public async createTransaction(@Body() depositDto: any) {
    try {
      if (
        depositDto.target.bank != '352' ||
        depositDto.target.branch != '0001'
      ) {
        throw new AppErrorService(
          'Dados incompatíveis do banco de destino.',
          400,
        );
      }

      if (depositDto.event === 'TRANSFER' || depositDto.event === 'PIX') {
        return await this.eventsService.handleTransferTransaction(depositDto);
      } else if (depositDto.event === 'DEPOSIT') {
        return await this.eventsService.handleDepositTransaction(depositDto);
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
            error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
