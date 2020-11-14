import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605364002283 implements MigrationInterface {
  name = "migrate1605364002283";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }
}
