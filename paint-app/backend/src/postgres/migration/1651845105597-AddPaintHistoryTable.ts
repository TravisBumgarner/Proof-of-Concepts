import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPaintHistoryTable1651845105597 implements MigrationInterface {
    name = 'AddPaintHistoryTable1651845105597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paint_history" ("id" SERIAL NOT NULL, "index" integer NOT NULL, "color" character varying NOT NULL, "room" character varying NOT NULL, CONSTRAINT "PK_b4b7792c2bda3a769d2eb22efa3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paint_history"`);
    }

}
