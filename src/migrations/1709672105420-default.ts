import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709672105420 implements MigrationInterface {
    name = 'Default1709672105420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desafios" ALTER COLUMN "escolhaDoUsuarioAceitou" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "desafios" ALTER COLUMN "escolhaDoUsuarioAceitou" SET NOT NULL`);
    }

}
