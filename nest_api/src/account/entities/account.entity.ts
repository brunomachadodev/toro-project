import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('identity')
  public readonly id?: number;

  @Column({ nullable: false, unique: false })
  public name: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ nullable: false, unique: false })
  public cpf: string;

  @CreateDateColumn()
  public created_at?: Date;
}
