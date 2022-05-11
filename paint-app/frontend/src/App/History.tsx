import React from 'react'
import {
  useQuery,
  gql
} from '@apollo/client'

import Canvas from './Canvas'
import { PaintEvent, Room } from '../../../shared/types'

const HISTORY_QUERY = gql`
  query HistoryQuery($room: String!, $page: Int!) {
    history(room: $room, page: $page) {
      color,
      pixelIndex
    }
  }
`

const ROOMS_QUERY = gql`
  query Rooms {
    rooms {
      id,
      title
    }
  }
`

class PaintHistoryQueue {
  pixels: PaintEvent
  head: number

  constructor() {
    this.pixels = [];
  }

  add(pixels: PaintEvent) {
    this.pixels = [...this.pixels, ...pixels]
  }

  get() {
    return this.pixels.shift()
  }
  
  get length() {
    return this.pixels.length;
  }

  get isEmpty() {
    return this.pixels.length === 0;
  }
}
const BLANK_CANVAS = Array.apply(null, Array(100)).map(() => "#FFFFFF")
const queue = new PaintHistoryQueue()

const History = () => {
  const [painting, setPainting] = React.useState<string[]>([...BLANK_CANVAS])
  const [room, setRoom] = React.useState<string>('')
  const [rooms, setRooms] = React.useState<Room[]>([]) 
  const [currentPage, setCurrentPage] = React.useState<number>(0)
  const [shouldFetchMoreData, setShouldFetchMoreData] = React.useState<boolean>(false)
  const [hasFetchedAllData, setHasFetchedAllData] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setPainting([...BLANK_CANVAS])
    setCurrentPage(0)
  }, [room])

  React.useEffect(() => {
    setInterval(() => {
      if(queue.isEmpty || hasFetchedAllData) return    
      
      if(queue.length < 25 && !hasFetchedAllData) setShouldFetchMoreData(true)
      
      setPainting(prev => {
        const {pixelIndex, color} = queue.get()
        const updatedPaiting = [...prev]
        updatedPaiting[pixelIndex] = color
        return updatedPaiting
      })
    }, 25)
  }, [])

  useQuery<{ history: PaintEvent }>(HISTORY_QUERY, {
    variables: {
      room,
      page: currentPage
    },
    skip: shouldFetchMoreData === false,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if(data.history.length === 0 ){
        console.log('fetched all data')
        setHasFetchedAllData(true)
        setShouldFetchMoreData(false)
      }
      setCurrentPage(prev => prev + 1)
      queue.add(data.history)
      setShouldFetchMoreData(false)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
      setShouldFetchMoreData(false)
    },
  },)

  useQuery<{ rooms: Room[] }>(ROOMS_QUERY, {
    onCompleted: (data) => {
      setRooms(data.rooms)
      setIsLoading(false)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
      setIsLoading(false)
    },
  })
  const PickARoom = (
    <select value={room} onChange={(event) => setRoom(event.target.value)}>
      <option value={''}>Pick One</option>
      {
        rooms.map(({id, title}) => <option key={id} value={id}>{title}</option>)
      }
    </select>
  )

  if (!room) {
    return (
      <div>
        {PickARoom}
      </div>
    )
  }

  return (
    <div>
      {PickARoom}
      <button onClick={() => setShouldFetchMoreData(true)}>Paint!</button>
      <Canvas room={room} painting={painting} readonly={true}/>
    </div>
  )
}

export default History
