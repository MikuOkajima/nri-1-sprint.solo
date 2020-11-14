import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import TrxPayee from "./TrxPayee";
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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @OneToMany((type) => TrxPayee, (trxPayee) => trxPayee.trxPayer)
  @JoinColumn()
  trxPayees: TrxPayee[];
}

export default TrxPayer;
