import * as React from 'react'
import {
  useQuery,
  useSubscription,
  useMutation,
  gql
} from '@apollo/client'

import Canvas from './Canvas'
import { PaintEvent, Room } from '../../../shared/types'

const HYDRATE_APP = gql`
  query HydrateQuery {
    rooms {
      id,
      title
    }
  }
`

const PAINTING_QUERY = gql`
  query PaintingQuery ($room: String!) {
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

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($id: String!, $title: String!) {
    createRoom(id: $id, title: $title) {
      id,
      title
    }
  }
`;



const Paint = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [painting, setPainting] = React.useState<string[]>([])
    const [room, setRoom] = React.useState<Room['id'] | ''>('')
    const [newRoomInput, setNewRoomInput] = React.useState<string>('')
    const [rooms, setRooms] = React.useState<Room[]>([]) 
    const [createRoom, { data, loading, error }] = useMutation(CREATE_ROOM_MUTATION);


    const handleNewPaintEvent = (pixels: PaintEvent) => {
      setPainting(prev => {
        const updatedPainting = [...prev]
  
        pixels.forEach(({ pixelIndex, color }) => updatedPainting[pixelIndex] = color)
        return updatedPainting
      })
    }
    const handleRoomChange = (room: Room['id']) => {
      setIsLoading(true)
      setRoom(room)
    }

    const handleRoomCreate = () => {
      createRoom({variables: {title: newRoomInput, id: newRoomInput.toLowerCase().replace(' ', '_')}})
    } 

    useQuery<{ rooms: Room[] }>(HYDRATE_APP, {
      onCompleted: (data) => {
        setRooms(data.rooms)
        setIsLoading(false)
      },
      onError: (error) => {
        console.log(JSON.stringify(error))
        setIsLoading(false)
      },
    })
  
    useQuery<{ painting: PaintEvent, rooms: Room[] }>(PAINTING_QUERY, {
      variables: {
        room
      },
      skip: room === '',
      onCompleted: (data) => {
        handleNewPaintEvent(data.painting)
      },
      onError: (error) => {
        console.log(JSON.stringify(error))
      },
    })
  
    useSubscription<{ paintEvent: PaintEvent }>(PAINTING_SUBSCRIPTION, {
      onSubscriptionData: (data) => {
        if (data.subscriptionData.data.paintEvent[0].room === room) {
          handleNewPaintEvent(data.subscriptionData.data.paintEvent)
        }
      }
    })
  
    if (isLoading) <p>Loading...</p>
    console.log(rooms)
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
          <p>or</p>
          <input value={newRoomInput} onChange={event => setNewRoomInput(event.target.value)} />
          <button onClick={handleRoomCreate} disabled={newRoomInput.length === 0}>Create Room</button>
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