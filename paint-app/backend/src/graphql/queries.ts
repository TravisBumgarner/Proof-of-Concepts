import { gql } from 'apollo-server'
import { getConnection, getManager } from "typeorm"

import { PaintEvent, ROOMS } from '../../../shared/types';
import { currentStateByRoom } from '../inMemoryProjections/paintState'
import { Room } from '../postgres/entity'

const queryTypeDefs = gql`
  type HistoryPixel {
    color: String
    pixelIndex: String
  }

  type Query {
    painting(room: String!): [Pixel]
    history(room: String!, page: Int!): [HistoryPixel]
    rooms: [RoomRoom]
  }
`;

const queryResolvers = {
  painting: (_, args) => currentStateByRoom[args.room].map((color, pixelIndex) => ({ color, pixelIndex })),
  rooms: async () => {
    return await getConnection()
      .getRepository(Room)
      .createQueryBuilder('room')
      .getMany()
  },
  history: async (_, args) => {
    const manager = getManager()

    const rooms = await getConnection()
      .getRepository(Room)
      .createQueryBuilder('room')
      .getMany()
    const page = parseInt(args.page, 10) || 0
    const room = rooms.some(({ id }) => args.room === id ) ? args.room : rooms[0].id // just throw em in the first room if it doesn't exist
    const data: { pixelIndex: number, color: string } = await manager.query(`
      SELECT
        "pixelIndex",
        color
      FROM 
        paint_history
      WHERE
        room = '${room}'
      ORDER BY
        "commitPosition" ASC,
        "paintEventIndex" ASC
      LIMIT
        100
      OFFSET
        ${page * 100}
      ;
  `)
    return data

  }
};

export {
  queryResolvers,
  queryTypeDefs
}