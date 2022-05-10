import styled from "styled-components"
import * as React from 'react'
import {
    useQuery,
    useSubscription,
    useMutation,
    gql
} from '@apollo/client'
import { ROOMS } from "../../../shared/types"

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

const CREATE_PAINTING_MUTATION = gql`
  mutation paintEvent($pixelIndex: Int!, $color: String!, $room: Room!) {
    paintEvent(pixelIndex: $pixelIndex, color: $color, room: $room) {
      color,
      pixelIndex
    }
  }
`;

const Canvas = ({ room, painting, readonly }: { room: ROOMS, painting: string[], readonly: boolean }) => {
    const [mouseDown, setMouseDown] = React.useState<boolean>(false)
    const [paintEvent, { data, loading, error }] = useMutation(CREATE_PAINTING_MUTATION);
    const [selectedColor, setSelectedColor] = React.useState<string>('#000000')

    React.useEffect(() => {
        if (readonly) return
        document.addEventListener('mousedown', () => setMouseDown(true))
        document.addEventListener('mouseup', () => setMouseDown(false))
    }, [])

    return (
        <>
            <FakePixelWrapper>
                {painting.map((color, pixelIndex) => (
                    <FakePixel
                        color={color}
                        key={pixelIndex}
                        onMouseEnter={(!readonly && mouseDown) ? () => paintEvent({ variables: { pixelIndex, color: selectedColor, room } }) : null}
                        onClick={!readonly ? () => paintEvent({ variables: { pixelIndex, color: selectedColor, room } }) : null}
                    />))}
            </FakePixelWrapper>
            {!readonly ? (
                <>
                    <h1>Color Picker</h1>
                    <div>
                        <input
                            type="color"
                            value={selectedColor}
                            onChange={(event) => setSelectedColor(event.target.value)}
                        />
                    </div>
                </>
            ) : null
            }
        </>
    )
}

export default Canvas
