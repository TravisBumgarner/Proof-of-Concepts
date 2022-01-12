import knex from './knex'

import { Book, Author } from '../types'

const selectAuthorsByIds = async (ids?: Author['id'][]) => {
    let rawQuery = `select * from authors`
    if (ids) {
        rawQuery += ` where id in (${ids.join(', ')})`
    }
    const knexResponse = await knex.raw(rawQuery)
    return knexResponse
}

const insertAuthorByName = async (name: string) => {
    let rawgetQuery = `select count(*) from authors;`
    const getResponse = await knex.raw(rawgetQuery)
    const authorCount = getResponse[0]['count(*)']

    let rawInsertQuery = `insert into authors (id, name) values (${authorCount + 1}, "${name}")`
    const knexResponse = await knex.raw(rawInsertQuery)
    return {
        id: authorCount + 1,
        name
    }
}

const selectBooksByIds = async (ids?: Book['id'][]) => {
    let rawQuery = `select count(*) from authors`
    if (ids) {
        rawQuery += ` where id in (${ids.join(', ')})`
    }
    const knexResponse = await knex.raw(rawQuery)
    return knexResponse
}

const selectBooksByAuthorIds = async (ids?: Author['id'][]) => {
    let rawQuery = `select * from books`
    if (ids) {
        rawQuery += ` where authorId in (${ids.join(', ')})`
    }
    const knexResponse = await knex.raw(rawQuery)
    return knexResponse
}


export {
    selectBooksByIds,
    selectAuthorsByIds,
    selectBooksByAuthorIds,
    insertAuthorByName,
}