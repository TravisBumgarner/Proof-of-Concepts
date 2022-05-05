import * as React from 'react'
import styled from 'styled-components'

import { Body, Title } from 'sharedComponents'

const FakePixel = styled.button`
  border: 0;
  background-color: ${({ color }) => color};
  width: 50px;
  height: 50px;
`

const COLORS = ['red', 'green', 'blue', 'yellow']

const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)];

const App = () => {
  const [colors, setColors] = React.useState<string[]>(COLORS)
  return (
    <Body>
      <Title>Canvas</Title>
      <div>
        {colors.map((color, index) => (
          <FakePixel
            color={color}
            key={index}
            onClick={() => setColors(prev => {
              const newColors = [...prev]
              newColors[index] = getRandomColor(COLORS)
              return newColors
            })}
          />)
        )}
      </div>
    </Body>
  )
}

export default App
