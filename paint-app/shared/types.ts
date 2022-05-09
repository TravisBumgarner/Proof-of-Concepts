enum ROOMS {
    modernism = "modernism",
    justChillin = "justChillin",
    abstract = "abstract"
  }

  type ColorMessage = {
    pixelIndex: number
    color: string
    room: string
  }[]

  export {
      ROOMS,
      ColorMessage
  }