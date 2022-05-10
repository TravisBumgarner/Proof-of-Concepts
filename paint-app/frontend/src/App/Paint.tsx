import * as React from 'react'
import {
  useQuery,
  useSubscription,
  useMutation,
  gql
} from '@apollo/client'

import Canvas from './Canvas'
import { ROOMS, PaintEvent } from '../../../shared/types'

const PAINTING_QUERY = gql`
  query PaintingQuery($room: Room!) {
    painting(room: $room) {
      color,
      pixelIndex
    }
  }
`

const PAINTING_SUBSCRIPTION = gql`
  subscription PixelFeed {
    paintEvent {
      color,
      pixelIndex,
      room
    }
  }
`;


const Paint = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [painting, setPainting] = React.useState<string[]>([])
    const [room, setRoom] = React.useState<ROOMS | ''>(ROOMS.abstract)
  
    const handleNewPaintEvent = (pixels: PaintEvent) => {
      setPainting(prev => {
        const updatedPainting = [...prev]
  
        pixels.forEach(({ pixelIndex, color }) => updatedPainting[pixelIndex] = color)
        return updatedPainting
      })
    }
  
    useQuery<{ painting: PaintEvent }>(PAINTING_QUERY, {
      variables: {
        room
      },
      skip: room === '',
      onCompleted: (data) => {
        handleNewPaintEvent(data.painting)
        setIsLoading(false)
      },
      onError: (error) => {
        console.log(JSON.stringify(error))
        setIsLoading(false)
      },
    })
  
    useSubscription<{ paintEvent: PaintEvent }>(PAINTING_SUBSCRIPTION, {
      onSubscriptionData: (data) => {
        if (data.subscriptionData.data.paintEvent[0].room === room) {
          handleNewPaintEvent(data.subscriptionData.data.paintEvent)
        }
      }
    })
  
    const PickARoom = (
      <select value={room} onChange={(event) => setRoom(event.target.value as ROOMS)}>
        <option value={''}>Pick One</option>
        {
          Object.keys(ROOMS).map((key: keyof typeof ROOMS) => <option key={key} value={key}>{ROOMS[key]}</option>)
        }
      </select>
    )
  
    if (isLoading) <p>Loading...</p>
  
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
        <h1>You're Drawing in {room}</h1>
        <Canvas room={room} painting={painting} readonly={false}/>
      </div>
    )
  }

  export default Paint