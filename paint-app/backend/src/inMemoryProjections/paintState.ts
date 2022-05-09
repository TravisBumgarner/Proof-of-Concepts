import { EntityRepository, getManager } from "typeorm"
import { ROOMS, ColorMessage } from "../../../shared/types"

const BLANK_CANVAS = Array.apply(null, Array(100)).map(() => "#FFFFFF")

let currentStateByRoom

const getInitialPaintState = async () => {
  const manager = getManager()
  const data: ColorMessage = await manager.query(`
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
  
  const state = data.reduce((accumulator, {pixelIndex, room, color}) => {
    if(!(room in accumulator)) accumulator[room] = [...BLANK_CANVAS]
    accumulator[room][pixelIndex] = color
    return accumulator
  }, {} as Record<string, string[]>)
  console.log('state', state)
  currentStateByRoom = state
}

export {
  getInitialPaintState,
  currentStateByRoom
}