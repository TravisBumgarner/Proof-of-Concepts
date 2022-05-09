import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPaintHistoryTable1652091873585 implements MigrationInterface {
    name = 'AddPaintHistoryTable1652091873585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paint_history" ("commitPosition" bigint NOT NULL, "paintEventIndex" integer NOT NULL, "pixelIndex" integer NOT NULL, "color" character varying NOT NULL, "room" character varying NOT NULL, CONSTRAINT "PK_c5a21d4ac23f4f312f4b3876475" PRIMARY KEY ("commitPosition", "paintEventIndex"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "paint_history"`);
    }

}
