import * as React from 'react'
import {
  useQuery,
  useSubscription,
  useMutation,
  gql
} from '@apollo/client'
import styled from 'styled-components'

import { ROOMS, PaintEvent } from '../../../shared/types'

const PIXEL_LENGTH = 20
const PIXELS_PER_ROW = 10

const FakePixel = styled.div`
  border: 0;
  background-color: ${({ color }) => color};
  width: ${PIXEL_LENGTH}px;
  height: ${PIXEL_LENGTH}px;
  margin: 0px;
  padding: 0;
  line-height: 0;
  display: inline-block;
  font-size: 0;
`

const FakePixelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${PIXELS_PER_ROW * PIXEL_LENGTH}px;
  border: 1px solid black;
`

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

const CREATE_COLOR_MUTATION = gql`
  mutation paintEvent($pixelIndex: Int!, $color: String!, $room: Room!) {
    paintEvent(pixelIndex: $pixelIndex, color: $color, room: $room) {
      color,
      pixelIndex
    }
  }
`;

const Paint = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [painting, setPainting] = React.useState<string[]>([])
    const [selectedColor, setSelectedColor] = React.useState<string>('#000000')
    const [room, setRoom] = React.useState<ROOMS | ''>(ROOMS.abstract)
    const [paintEvent, { data, loading, error }] = useMutation(CREATE_COLOR_MUTATION);
    const [mouseDown, setMouseDown] = React.useState<boolean>(false)
  
    React.useEffect(() => {
      document.addEventListener('mousedown', () => setMouseDown(true))
      document.addEventListener('mouseup', () => setMouseDown(false))
    }, [])
  
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
        <FakePixelWrapper>
          {painting.map((color, pixelIndex) => (
            <FakePixel
              color={color}
              key={pixelIndex}
              onMouseEnter={mouseDown ? () => paintEvent({ variables: { pixelIndex, color: selectedColor, room } }) : null}
              onClick={() => paintEvent({ variables: { pixelIndex, color: selectedColor, room }}) }
            />))}
        </FakePixelWrapper>
        <h1>Color Picker</h1>
        <div>
          <input
            type="color"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
          />
        </div>
      </div>
    )
  }

  export default Paint