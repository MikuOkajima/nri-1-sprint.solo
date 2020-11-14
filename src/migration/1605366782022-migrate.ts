import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605366782022 implements MigrationInterface {
  name = "migrate1605366782022";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
  }
}
