enum ROOMS {
    modernism = "modernism",
    justChillin = "justChillin",
    abstract = "abstract"
  }

  type ColorMessage = {
    index: number
    color: string
    room: string
  }[]

  export {
      ROOMS,
      ColorMessage
  }