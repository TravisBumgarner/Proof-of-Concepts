import React from 'react'
import {
  useQuery,
  useSubscription,
  useMutation,
  gql
} from '@apollo/client'

import Canvas from './Canvas'
import { ROOMS, PaintEvent } from '../../../shared/types'

const HISTORY_QUERY = gql`
  query HistoryQuery($room: Room!, $page: Int!) {
    history(room: $room, page: $page) {
      color,
      pixelIndex
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
  const [room, setRoom] = React.useState<ROOMS | ''>('')
  const [currentPage, setCurrentPage] = React.useState<number>(0)
  const [shouldFetchMoreData, setShouldFetchMoreData] = React.useState<boolean>(false)
  const [hasFetchedAllData, setHasFetchedAllData] = React.useState<boolean>(false)

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

  const PickARoom = (
    <select value={room} onChange={(event) => setRoom(event.target.value as ROOMS)}>
      <option value={''}>Pick One</option>
      {
        Object.keys(ROOMS).map((key: keyof typeof ROOMS) => <option key={key} value={key}>{ROOMS[key]}</option>)
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
