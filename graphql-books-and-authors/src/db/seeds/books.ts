import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("books").del();

    // Inserts seed entries
    await knex("books").insert([
        { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
        { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
        { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
        { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
        { id: 5, name: 'The Two Towers', authorId: 2 },
        { id: 6, name: 'The Return of the King', authorId: 2 },
        { id: 7, name: 'The Way of Shadows', authorId: 3 },
        { id: 8, name: 'Beyond the Shadows', authorId: 3 }
    ]);
};
