import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppErrorService } from 'src/utils/appError.service';
import { AccountService } from '../account.service';
import { AccountBalanceService } from '../balance/accountBalance.service';
import { UtilsService } from '../utils/utils.service';
import { TransferEventDto } from './dto/deposit-event.dto';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;

  describe('Post create', () => {
    it('should be able to create a transfer / pix event', async () => {
      const mockRequest = {
        event: 'TRANSFER',
        target: {
          bank: '352',
          branch: '0001',
          account: '1',
        },
        origin: {
          bank: 'test',
          branch: 'test',
          cpf: 'test',
        },
        amount: 15,
      };

      const mockAccountBalanceService = {};
      const mockAccountService = {};
      const mockEventsService = {
        handleTransferTransaction: jest
          .fn()
          .mockImplementation(async (transferDto: TransferEventDto) => {
            const transaction = {
              accountId: transferDto.target.account,
              balance: transferDto.amount,
              id: 1,
            };
            return transaction;
          }),
      };
      const mockUtilsService = {};

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EventsController],
        providers: [
          EventsService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(EventsService)
        .useValue(mockEventsService)
        .compile();

      eventsController = moduleRef.get<EventsController>(EventsController);

      const newEvent = await eventsController.createTransaction(mockRequest);

      expect(newEvent).toHaveProperty('balance');
      expect(newEvent).toHaveProperty('accountId');
    });

    it('should not be able to create an event if account target does not exist', async () => {
      const mockRequest = {
        event: 'TRANSFER',
        target: {
          bank: '352',
          branch: '0001',
          account: '1',
        },
        origin: {
          bank: 'test',
          branch: 'test',
          cpf: 'test',
        },
        amount: 15,
      };

      const mockAccountBalanceService = {};
      const mockAccountService = {};
      const mockEventsService = {
        handleTransferTransaction: jest.fn().mockImplementation(async () => {
          return new AppErrorService(
            'CPF de origem não correspondente ao da conta.',
            403,
          );
        }),
      };
      const mockUtilsService = {};

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EventsController],
        providers: [
          EventsService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(EventsService)
        .useValue(mockEventsService)
        .compile();

      eventsController = moduleRef.get<EventsController>(EventsController);

      try {
        await eventsController.createTransaction(mockRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('should be able to create a deposit event', async () => {
      const mockRequest = {
        event: 'DEPOSIT',
        target: {
          bank: '352',
          branch: '0001',
          account: '1',
        },
        origin: {
          bank: 'test',
          branch: 'test',
          cpf: 'test',
        },
        amount: 15,
      };

      const mockAccountBalanceService = {};
      const mockAccountService = {};
      const mockEventsService = {
        handleDepositTransaction: jest
          .fn()
          .mockImplementation(async (transferDto: TransferEventDto) => {
            const transaction = {
              accountId: transferDto.target.account,
              balance: transferDto.amount,
              id: 1,
            };
            return transaction;
          }),
      };
      const mockUtilsService = {};

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EventsController],
        providers: [
          EventsService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(EventsService)
        .useValue(mockEventsService)
        .compile();

      eventsController = moduleRef.get<EventsController>(EventsController);

      const newEvent = await eventsController.createTransaction(mockRequest);

      expect(newEvent).toHaveProperty('balance');
      expect(newEvent).toHaveProperty('accountId');
    });

    it('should not be able to create a deposit event if account target does not exists', async () => {
      const mockRequest = {
        event: 'DEPOSIT',
        target: {
          bank: '352',
          branch: '0001',
          account: '1',
        },
        origin: {
          bank: 'test',
          branch: 'test',
          cpf: 'test',
        },
        amount: 15,
      };

      const mockAccountBalanceService = {};
      const mockAccountService = {};
      const mockEventsService = {
        handleDepositTransaction: jest.fn().mockImplementation(async () => {
          return new AppErrorService(
            'CPF de origem não correspondente ao da conta.',
            403,
          );
        }),
      };
      const mockUtilsService = {};

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EventsController],
        providers: [
          EventsService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(EventsService)
        .useValue(mockEventsService)
        .compile();

      eventsController = moduleRef.get<EventsController>(EventsController);

      try {
        await eventsController.createTransaction(mockRequest);
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('should not be able to create an event if the information are incorrect', async () => {
      const mockRequestErr = {
        event: 'TRANSFER',
        target: {
          bank: 'test',
          branch: 'test',
          account: 'test',
        },
        origin: {
          bank: 'test',
          branch: 'test',
          cpf: 'test',
        },
        amount: 0,
      };

      const mockAccountBalanceService = {};
      const mockAccountService = {};
      const mockEventsService = {};
      const mockUtilsService = {};

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EventsController],
        providers: [
          EventsService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(EventsService)
        .useValue(mockEventsService)
        .compile();

      eventsController = moduleRef.get<EventsController>(EventsController);

      try {
        await eventsController.createTransaction(mockRequestErr);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(400);
      }
    });

    it('should not be able to create an event if an error happen', async () => {
      const mockRequestE = {
        event: 'TRANSFER',
        target: {
          bank: 'test',
          branch: 'test',
          account: 'test',
        },
        origin: {
          bank: 'test',
          branch: 'test',
          cpf: 'test',
        },
        amount: 0,
      };

      const mockAccountBalanceService = {};
      const mockAccountService = {};
      const mockEventsService = {};
      const mockUtilsService = {};

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EventsController],
        providers: [
          EventsService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(EventsService)
        .useValue(mockEventsService)
        .compile();

      eventsController = moduleRef.get<EventsController>(EventsController);

      try {
        await eventsController.createTransaction(mockRequestE);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(400);
      }
    });
  });
});
