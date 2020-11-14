import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}

export default User;
