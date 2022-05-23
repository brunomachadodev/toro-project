import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Account } from '../entities/account.entity';

@Entity('account_balance')
export class AccountBalance {
  @PrimaryGeneratedColumn('identity')
  public readonly id?: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  @Column({ name: 'account_id', unique: false, nullable: false })
  public accountId: number;

  @Column({ nullable: false, unique: false })
  public balance: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt?: Date;
}
