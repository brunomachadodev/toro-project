import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountBalanceService } from './balance/accountBalance.service';
import { UtilsService } from './utils/utils.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { HttpException } from '@nestjs/common';
import { findByCpfDto } from './dto/find-account.dto';

describe('AccountController', () => {
  let accountController: AccountController;

  const mockRequest: CreateAccountDto = {
    name: 'test',
    cpf: 'test',
    email: 'test',
  };

  const mockResponse = [
    {
      id: 1,
      name: 'test',
      cpf: 'test',
      email: 'test',
    },
    {
      id: 2,
      name: 'test2',
      cpf: 'test2',
      email: 'test2',
    },
  ];

  const mockAccountBalanceService = {};

  const mockUtilsService = {
    formatCpf: jest.fn().mockImplementation((cpf: string) => {
      return cpf;
    }),
    validateCpf: jest.fn().mockImplementation(() => {
      return true;
    }),
  };

  describe('Post create', () => {
    it('should be able to create a account', async () => {
      const mockAccountService = {
        handleAccountCreation: jest
          .fn()
          .mockImplementation(async (createAccountDto: CreateAccountDto) => {
            return {
              id: 1,
              ...createAccountDto,
            };
          }),

        findByEmail: jest.fn().mockImplementation(async () => {
          return false;
        }),

        findByCpf: jest.fn().mockImplementation(async () => {
          return false;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountController],
        providers: [
          AccountService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(AccountService)
        .useValue(mockAccountService)
        .compile();

      accountController = moduleRef.get<AccountController>(AccountController);

      const newAccount = await accountController.create(mockRequest);

      expect(newAccount).toHaveProperty('id');
      expect(newAccount).toHaveProperty('cpf');
      expect(newAccount).toHaveProperty('email');
      expect(newAccount).toHaveProperty('name');
    });

    it('should not be able to create a account if email already exits ', async () => {
      const mockAccountService = {
        findByEmail: jest.fn().mockImplementation(() => {
          return true;
        }),

        findByCpf: jest.fn().mockImplementation(() => {
          return false;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountController],
        providers: [
          AccountService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(AccountService)
        .useValue(mockAccountService)
        .compile();

      accountController = moduleRef.get<AccountController>(AccountController);

      try {
        await accountController.create(mockRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(409);
      }
    });

    it('should not be able to create a account if cpf already exits', async () => {
      const mockAccountService = {
        findByEmail: jest.fn().mockImplementation(() => {
          return false;
        }),

        findByCpf: jest.fn().mockImplementation(() => {
          return true;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountController],
        providers: [
          AccountService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(AccountService)
        .useValue(mockAccountService)
        .compile();

      accountController = moduleRef.get<AccountController>(AccountController);

      try {
        await accountController.create(mockRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(409);
      }
    });
  });

  describe('Post find', () => {
    it('should be able to find an account', async () => {
      const mockAccountService = {
        findByCpf: jest.fn().mockImplementation(async (cpf: string) => {
          return mockResponse.find((account) => account.cpf === cpf);
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountController],
        providers: [
          AccountService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(AccountService)
        .useValue(mockAccountService)
        .compile();

      accountController = moduleRef.get<AccountController>(AccountController);

      const cpfRequest: findByCpfDto = { cpf: 'test2' };

      const findAccount = await accountController.findAccountByCpf(cpfRequest);

      expect(findAccount.id).toBe(2);
    });

    it('should not be able to find a non-existent account', async () => {
      const mockAccountService = {
        findByCpf: jest.fn().mockImplementation(async () => {
          return false;
        }),
      };

      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AccountController],
        providers: [
          AccountService,
          AccountBalanceService,
          {
            provide: AccountBalanceService,
            useValue: mockAccountBalanceService,
          },
          UtilsService,
          { provide: UtilsService, useValue: mockUtilsService },
        ],
      })
        .overrideProvider(AccountService)
        .useValue(mockAccountService)
        .compile();

      accountController = moduleRef.get<AccountController>(AccountController);

      const cpfRequest: findByCpfDto = { cpf: 'test3' };

      try {
        await accountController.findAccountByCpf(cpfRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
