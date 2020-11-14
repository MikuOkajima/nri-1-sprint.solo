import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605363873394 implements MigrationInterface {
  name = "migrate1605363873394";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trx_payer" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "purpose" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "payerId" integer, CONSTRAINT "PK_445e6171a71827eb4bca39c5d13" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "trx_payee" ("id" SERIAL NOT NULL, "trxPayerId" integer, "payeeId" integer, CONSTRAINT "PK_2f1c1c6b468af0beb031d2900d5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payer" ADD CONSTRAINT "FK_0499a94974bffb338122672fa93" FOREIGN KEY ("payerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" ADD CONSTRAINT "FK_1486e8e64ebc0af5c3d7b2543e0" FOREIGN KEY ("trxPayerId") REFERENCES "trx_payer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" ADD CONSTRAINT "FK_97305726611a1133c1f03a49a0e" FOREIGN KEY ("payeeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trx_payee" DROP CONSTRAINT "FK_97305726611a1133c1f03a49a0e"`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payee" DROP CONSTRAINT "FK_1486e8e64ebc0af5c3d7b2543e0"`
    );
    await queryRunner.query(
      `ALTER TABLE "trx_payer" DROP CONSTRAINT "FK_0499a94974bffb338122672fa93"`
    );
    await queryRunner.query(`DROP TABLE "trx_payee"`);
    await queryRunner.query(`DROP TABLE "trx_payer"`);
  }
}
