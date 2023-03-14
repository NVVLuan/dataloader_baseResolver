import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1678791600673 implements MigrationInterface {
    name = 'updatePostTable1678791600673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
