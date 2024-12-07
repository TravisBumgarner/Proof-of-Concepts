// Start with grid and check performance.

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const GRID_SIDE_LENGTH = 8

const EngineeringDoc = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(-1)
  const [rows, setRows] = useState(-1)

  useEffect(() => {
    if (gridRef.current) {
      const { width, height } = gridRef.current.getBoundingClientRect()
      setColumns(Math.floor(width / GRID_SIDE_LENGTH))
      setRows(Math.floor(height / GRID_SIDE_LENGTH))
    }
  }, [])

  return (
    <Grid ref={gridRef} $columns={columns} $rows={rows}>
      {Array.from({ length: 100 }).map((_, index) => (
        <RandomColor
          $gridRowSpan={Math.floor(Math.random() * 8) + 1}
          $gridColumnSpan={Math.floor(Math.random() * 8) + 1}
          key={index}
          $color={randomColor()}
        ></RandomColor>
      ))}
    </Grid>
  )
}

export default EngineeringDoc

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

const RandomColor = styled.div<{
  $color: string
  $gridRowSpan: number
  $gridColumnSpan: number
}>`
  background-color: ${({ $color }) => $color};
  width: 100%;
  height: 100%;
  grid-row: span ${({ $gridRowSpan }) => $gridRowSpan};
  grid-column: span ${({ $gridColumnSpan }) => $gridColumnSpan};
`

const Grid = styled.div<{ $columns: number; $rows: number }>`
  // prevent flickering while loading.
  visibility: ${({ $columns, $rows }) =>
    $columns === -1 && $rows === -1 ? 'hidden' : 'visible'};
  display: grid;
  grid-template-columns: repeat(
    ${({ $columns }) => $columns},
    ${GRID_SIDE_LENGTH}px
  );
  grid-template-rows: repeat(${({ $rows }) => $rows}, ${GRID_SIDE_LENGTH}px);
  /* gap: 1px; */
  width: 500px;
  height: 1500px;
  background-color: #000;
`
