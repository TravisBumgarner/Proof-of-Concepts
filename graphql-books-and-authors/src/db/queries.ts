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

const selectBooksByIds = async (ids?: Book['id'][]) => {
    let rawQuery = `select * from books`
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
    selectBooksByAuthorIds
}