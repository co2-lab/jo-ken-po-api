import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1710900813738 implements MigrationInterface {
    name = 'Default1710900813738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desafios" ADD "nome" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desafios" DROP COLUMN "nome"`);
    }

}
