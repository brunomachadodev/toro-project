import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccountTransactions1653266981088
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account_transactions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'identity',
            generatedIdentity: 'ALWAYS',
            isGenerated: true,
          },
          {
            name: 'account_id',
            type: 'int',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['DEPOSIT', 'TRANSFER', 'PIX', 'TED'],
          },
          {
            name: 'amount',
            type: 'numeric',
            isUnique: false,
          },
          {
            name: 'origin_bank',
            type: 'varchar',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'origin_branch',
            type: 'varchar',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account_transactions');
  }
}
