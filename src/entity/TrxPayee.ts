import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { TrxPayer } from "./TrxPayer";
import { User } from "./User";

@Entity({ name: "trx_payee" })
export class TrxPayee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => TrxPayer, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  trxPayer: TrxPayer;

  @ManyToOne((type) => User, {})
  @JoinColumn()
  payee: User;
}

export default TrxPayee;
