import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
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

  @Column()
  creationDate: Date;
}

export default TrxPayer;
