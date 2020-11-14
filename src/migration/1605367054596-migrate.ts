import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605367054596 implements MigrationInterface {
  name = "migrate1605367054596";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }
}
