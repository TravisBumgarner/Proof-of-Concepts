import { gql } from 'apollo-server'
import { getManager } from "typeorm"

import { PaintEvent, ROOMS } from '../../../shared/types';
import { currentStateByRoom } from '../inMemoryProjections/paintState'

const queryTypeDefs = gql`
  type HistoryPixel {
    color: String
    pixelIndex: String
  }

  type Query {
    painting(room: Room!): [Pixel]
    history(room: Room!, page: Int!): [HistoryPixel]
  }
`;

const queryResolvers = {
  painting: (_, args) => currentStateByRoom[args.room].map((color, pixelIndex) => ({ color, pixelIndex })),
  history: async (_, args) => {
    const manager = getManager()

    const page = parseInt(args.page, 10) || 0
    const room = Object.values(ROOMS).includes(args.room) ? args.room : ROOMS.abstract

    const data: {pixelIndex: number, color: string} = await manager.query(`
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