import { ROOMS } from "../../../shared/types"

const BLANK_CANVAS = Array.apply(null, Array(100)).map(() => "#FFFFFF")

const currentStateByRoom = {
  [ROOMS.modernism]: [...BLANK_CANVAS],
  [ROOMS.justChillin]: [...BLANK_CANVAS],
  [ROOMS.abstract]: [...BLANK_CANVAS],
}

export default currentStateByRoom