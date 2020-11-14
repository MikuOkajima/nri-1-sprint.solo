import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605368219553 implements MigrationInterface {
  name = "migrate1605368219553";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }
}
