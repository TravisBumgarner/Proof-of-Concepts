enum ROOMS {
    modernism = "modernism",
    justChillin = "justChillin",
    abstract = "abstract"
  }

  type PaintEvent = {
    pixelIndex: number
    color: string
    room: string
  }[]

type Room = {
  id: string,
  title: string
}

  export {
      ROOMS,
      PaintEvent,
      Room
  }