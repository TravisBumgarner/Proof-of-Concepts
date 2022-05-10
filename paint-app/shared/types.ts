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

  export {
      ROOMS,
      PaintEvent
  }