import User from "../entity/User";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import UserSeed from "./users.json";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(UserSeed)
      .execute();
  }
}
