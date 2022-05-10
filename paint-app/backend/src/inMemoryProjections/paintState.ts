import { getManager } from "typeorm"
import { ROOMS, PaintEvent } from "../../../shared/types"

const BLANK_CANVAS = Array.apply(null, Array(100)).map(() => "#FFFFFF")

let currentStateByRoom

const getInitialPaintState = async () => {
  const manager = getManager()
  const data: PaintEvent = await manager.query(`
    SELECT
      DISTINCT ON ("pixelIndex")
      "pixelIndex",
      color,
      room
    FROM
      paint_history
    ORDER BY
      "pixelIndex",
      ("commitPosition"::bigint + "paintEventIndex"::bigint) DESC
  `)
  
  const EMPTY_STATE = {}
  Object.values(ROOMS).forEach(room => EMPTY_STATE[room] = [...BLANK_CANVAS] )

  const state = data.reduce((accumulator, {pixelIndex, room, color}) => {
    accumulator[room][pixelIndex] = color
    return accumulator
  }, {...EMPTY_STATE} as Record<string, string[]>)

  currentStateByRoom = state
}

export {
  getInitialPaintState,
  currentStateByRoom
}