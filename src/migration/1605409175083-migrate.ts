import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605409175083 implements MigrationInterface {
  name = "migrate1605409175083";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trx_payer" DROP CONSTRAINT "FK_0499a94974bffb338122672fa93"`
    );
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "trx_payer" ALTER COLUMN "payerId" SET NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."payerId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "trx_payee" DROP CONSTRAINT "FK_1486e8e64ebc0af5c3d7b2543e0"`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" ALTER COLUMN "trxPayerId" SET NOT NULL`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "trx_payee"."trxPayerId" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payer" ADD CONSTRAINT "FK_0499a94974bffb338122672fa93" FOREIGN KEY ("payerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" ADD CONSTRAINT "FK_1486e8e64ebc0af5c3d7b2543e0" FOREIGN KEY ("trxPayerId") REFERENCES "trx_payer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trx_payee" DROP CONSTRAINT "FK_1486e8e64ebc0af5c3d7b2543e0"`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payer" DROP CONSTRAINT "FK_0499a94974bffb338122672fa93"`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "trx_payee"."trxPayerId" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" ALTER COLUMN "trxPayerId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" ADD CONSTRAINT "FK_1486e8e64ebc0af5c3d7b2543e0" FOREIGN KEY ("trxPayerId") REFERENCES "trx_payer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."payerId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "trx_payer" ALTER COLUMN "payerId" DROP NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "trx_payer"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "trx_payer" ADD CONSTRAINT "FK_0499a94974bffb338122672fa93" FOREIGN KEY ("payerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
