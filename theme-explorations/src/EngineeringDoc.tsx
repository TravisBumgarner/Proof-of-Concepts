// Start with grid and check performance.

import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const GRID_SIDE_LENGTH = 8

const EngineeringDoc = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(0)
  const [rows, setRows] = useState(0)

  useEffect(() => {
    if (gridRef.current) {
      const { width, height } = gridRef.current.getBoundingClientRect()
      console.log(width, height)
      setColumns(Math.floor(width / GRID_SIDE_LENGTH))
      setRows(Math.floor(height / GRID_SIDE_LENGTH))
    }
  }, [])

  return (
    <Grid ref={gridRef} $columns={columns} $rows={rows}>
      {Array.from({ length: 100 }).map((_, index) => (
        <RandomColor
          $gridColumn={Math.floor(Math.random() * columns)}
          $gridRow={Math.floor(Math.random() * rows)}
          $color={randomColor()}
          key={index}
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
  $gridColumn: number
  $gridRow: number
}>`
  background-color: ${({ $color }) => $color};
  width: 100%;
  height: 100%;
  grid-column: ${({ $gridColumn }) => $gridColumn};
  grid-row: ${({ $gridRow }) => $gridRow};
`

const Grid = styled.div<{ $columns: number; $rows: number }>`
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
