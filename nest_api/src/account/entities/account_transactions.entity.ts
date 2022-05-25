import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity('account_transactions')
export class AccountTransactions {
  @PrimaryGeneratedColumn('identity')
  public readonly id?: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  public accountId: number;

  @Column({ nullable: false, unique: false })
  public type: string;

  @Column({ nullable: false, unique: false })
  public amount: number;

  @Column({ name: 'origin_bank', nullable: true, unique: false })
  public originBank: string;

  @Column({ name: 'origin_branch', nullable: true, unique: false })
  public originBranch: string;

  @CreateDateColumn()
  public created_at?: Date;
}
