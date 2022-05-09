import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPaintHistoryTable1652090003541 implements MigrationInterface {
    name = 'AddPaintHistoryTable1652090003541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paint_history" ("id" character varying NOT NULL, "index" integer NOT NULL, "color" character varying NOT NULL, "room" character varying NOT NULL, CONSTRAINT "PK_b4b7792c2bda3a769d2eb22efa3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paint_history"`);
    }

}
