import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoomTable1652269225683 implements MigrationInterface {
    name = 'AddRoomTable1652269225683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
