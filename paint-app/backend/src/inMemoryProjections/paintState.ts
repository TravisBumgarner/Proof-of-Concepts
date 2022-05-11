import { getManager } from "typeorm"
import { PaintEvent } from "../../../shared/types"

const BLANK_CANVAS = Array.apply(null, Array(100)).map(() => "#FFFFFF")

let currentStateByRoom

const getInitialPaintState = async () => {
  const manager = getManager()

  const rooms: { id: string }[] = await manager.query(`
    SELECT
      id
    FROM
      room
  `)
  const data: PaintEvent = await manager.query(`
    SELECT
      DISTINCT ON ("pixelIndex")
      "pixelIndex",
      color,
      room
    FROM
      paint_history
    WHERE
		  room in (select id from room)  
    ORDER BY
      "pixelIndex",
      ("commitPosition"::bigint + "paintEventIndex"::bigint) DESC
  `)
      
  const EMPTY_STATE = {}
  rooms.forEach(room => EMPTY_STATE[room.id] = [...BLANK_CANVAS])
  
  const state = data.reduce((accumulator, { pixelIndex, room, color }) => {
    accumulator[room][pixelIndex] = color
    return accumulator
  }, { ...EMPTY_STATE } as Record<string, string[]>)

  currentStateByRoom = state
}

export {
  getInitialPaintState,
  currentStateByRoom
}