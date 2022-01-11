import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("authors").del();

    // Inserts seed entries
    await knex("authors").insert([
        { id: 1, name: 'J. K. Rowling' },
        { id: 2, name: 'J. R. R. Tolkien' },
        { id: 3, name: 'Brent Weeks' }
    ]);
};
