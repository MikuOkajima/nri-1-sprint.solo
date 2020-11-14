import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({ name: "users" })
@Unique(["name"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default User;
