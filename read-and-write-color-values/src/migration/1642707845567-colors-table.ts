import { MigrationInterface, QueryRunner } from "typeorm";

export class colorsTable1642707845567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create type color_t as enum('RED', 'GREEN', 'BLUE');

            CREATE TABLE color (
                id uuid PRIMARY KEY,
                color color_t,
                timestamp timestamp
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE color;
        `)
    }

}
