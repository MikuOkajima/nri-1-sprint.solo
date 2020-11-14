import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "trx_payer" })
export class TrxPayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, {})
  @JoinColumn()
  payer: User;

  @Column()
  amount: number;

  @Column()
  purpose: string;

  //   @CreateDateColumn({ name: 'creation_date', type: 'timestamp', precision: 0 })
  //   readonly creationDate: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}

export default TrxPayer;
