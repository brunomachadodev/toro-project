import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account.service';
import { AccountBalanceController } from './accountBalance.controller';
import { AccountBalanceService } from './accountBalance.service';
import { CreateAccountBalanceDto } from './dto/create-accountBalance.dto';

describe('AccountBalanceController', () => {
  let accountBalanceController: AccountBalanceController;

  const mockRequest: CreateAccountBalanceDto = {
    accountId: 1,
    balance: 0,
  };

  describe('Post create', () => {
    it('should be able to create a balance', async () => {
      const mockAccountBalanceService = {
        handleBalanceAddition: jest
          .fn()
          .mockImplementation(
            async (createAccountBalanceDto: CreateAccountBalanceDto) => {
              return {
                id: 5,
                accountId: createAccountBalanceDto.accountId,
                balance: 0,
                createdAt: Date(),
              };
            },
          ),

        create: jest.fn().mockImplementation(async () => {
          return false;
        }),

        findAccountLastBalance: jest.fn().mockImplementation(async () => {
          return false;
        }),
      };

      const mockAccountService = {
        findById: jest.fn().mockImplementation(async (id: number) => {
          return id;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountBalanceController],
        providers: [
          AccountBalanceService,
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
        ],
      })
        .overrideProvider(AccountBalanceService)
        .useValue(mockAccountBalanceService)
        .compile();

      accountBalanceController = moduleRef.get<AccountBalanceController>(
        AccountBalanceController,
      );
      const newBalance = await accountBalanceController.incrementBalance(
        mockRequest,
      );

      expect(newBalance).toHaveProperty('id_operacao');
      expect(newBalance).toHaveProperty('data_da_transacao');
    });

    it('should not be able to create balance if account does not exist', async () => {
      const mockAccountBalanceService = {};

      const mockAccountService = {
        findById: jest.fn().mockImplementation(async () => {
          return false;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountBalanceController],
        providers: [
          AccountBalanceService,
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
        ],
      })
        .overrideProvider(AccountBalanceService)
        .useValue(mockAccountBalanceService)
        .compile();

      accountBalanceController = moduleRef.get<AccountBalanceController>(
        AccountBalanceController,
      );

      try {
        await accountBalanceController.incrementBalance(mockRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
      }
    });

    it('should not be able to create balance if an error happens', async () => {
      const mockAccountBalanceService = {
        handleBalanceAddition: jest.fn().mockImplementation(async () => {
          return true;
        }),
      };

      const mockAccountService = {
        findById: jest.fn().mockImplementation(async () => {
          return true;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountBalanceController],
        providers: [
          AccountBalanceService,
          AccountService,
          { provide: AccountService, useValue: mockAccountService },
        ],
      })
        .overrideProvider(AccountBalanceService)
        .useValue(mockAccountBalanceService)
        .compile();

      accountBalanceController = moduleRef.get<AccountBalanceController>(
        AccountBalanceController,
      );

      try {
        await accountBalanceController.incrementBalance(mockRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(500);
      }
    });
  });
});
