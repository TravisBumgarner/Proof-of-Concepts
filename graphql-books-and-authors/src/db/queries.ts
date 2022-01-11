import knex from './knex'

import { Book, Author } from '../types'


// const insert = async ({ id, color, timestamp }: ButtonPress) => {
//     const response = await knex('buttons').insert({
//         id,
//         color,
//         timestamp
//     })
//         .onConflict('id')
//         .ignore()
//     return response
// }



const selectBooksByIds = async (ids?: Book['id'][]) => {
    let rawQuery = `select * from books`
    if (ids) {
        rawQuery += ` where id in (${ids.join(', ')})`
    }
    console.log(rawQuery)
    const knexResponse = await knex.raw(rawQuery)
    console.log(knexResponse)
    return knexResponse
}

export {
    selectBooksByIds
}