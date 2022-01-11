import { Knex } from "knex";

const TABLE = 'authors'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE, table => {
        table.integer('id').primary().notNullable
        table.string('name').notNullable
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable(TABLE)
}

