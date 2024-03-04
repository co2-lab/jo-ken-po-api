import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709469052799 implements MigrationInterface {
    name = 'Default1709469052799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "name" text NOT NULL, "date_nasc" date NOT NULL, "cpf" integer NOT NULL, "rg" integer NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "date_cadastro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "desafios" ("id" SERIAL NOT NULL, "id_criador" integer, "id_acetou" integer, CONSTRAINT "PK_04126745b4c93c5e5be5a639bb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "desafios" ADD CONSTRAINT "FK_f25604290a4d39effeae2ad12c9" FOREIGN KEY ("id_criador") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "desafios" ADD CONSTRAINT "FK_a25d53793a8d74a401a0ec4647f" FOREIGN KEY ("id_acetou") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desafios" DROP CONSTRAINT "FK_a25d53793a8d74a401a0ec4647f"`);
        await queryRunner.query(`ALTER TABLE "desafios" DROP CONSTRAINT "FK_f25604290a4d39effeae2ad12c9"`);
        await queryRunner.query(`DROP TABLE "desafios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
