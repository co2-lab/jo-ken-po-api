import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709473122264 implements MigrationInterface {
    name = 'Default1709473122264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_ebebcaef8457dcff6e6d69f17b0" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_1087107b59843f51aeab282de1e" UNIQUE ("rg")`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_1087107b59843f51aeab282de1e"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_ebebcaef8457dcff6e6d69f17b0"`);
    }

}
