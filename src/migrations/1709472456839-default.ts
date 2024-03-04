import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709472456839 implements MigrationInterface {
    name = 'Default1709472456839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "cpf" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "rg"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "rg" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "rg"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "rg" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "cpf" integer NOT NULL`);
    }

}
