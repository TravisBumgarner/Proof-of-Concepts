import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { type PhotoType } from 'types'
import { context } from './context'
import { getPhotoUrl } from './utils'

const StyledBrick = styled.img<{ $borderColor: string }>`
  border: ${props => `10px solid ${props.$borderColor}`};
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const Brick = ({ vibrantcolors: { darkVibrant }, src }: PhotoType) => {
  return (
    <StyledBrick
      $borderColor={darkVibrant!}
      src={getPhotoUrl({
        isThumbnail: true,
        photoSrc: src
      })}
    />
  )
}

const Column = ({ photos }: { photos: PhotoType[] }) => {
  return (
    <div>
      {photos.map(photo => (
        <Brick key={photo.id} {...photo} />
      ))}
    </div>
  )
}

const Masonry = () => {
  const [photoCount, setPhotoCount] = useState(11)
  const [columns, setColumns] = useState(3)

  const {
    state: { photos }
  } = useContext(context)

  const imagesByColumn = useMemo(() => {
    // Grab photos one at a time.
    // Use photos hardcoded widths and heights to calculate things. Makes it easier for resize

    const columnHeights = Array<number>(columns).fill(0)
    const output = Array.from({ length: columns }, () => [] as PhotoType[])

    Object.values(photos).forEach(photo => {
      // All photos will have a width of 1 unit.
      // Calculate height based on aspect ratio and we'll use that to determine
      // which column to put it in.
      const unitHeight = photo.height / photo.width

      const columnforCurrentPhoto = columnHeights.indexOf(
        Math.min(...columnHeights)
      )

      columnHeights[columnforCurrentPhoto] += unitHeight
      output[columnforCurrentPhoto].push(photo)
    })

    return output
  }, [photos, columns])
  console.log(imagesByColumn)
  return (
    <>
      <ButtonsWrapper>
        Photo Count:
        <button
          onClick={() => {
            setPhotoCount(prev => prev + 1)
          }}
        >
          ++
        </button>
        <button
          onClick={() => {
            setPhotoCount(prev => prev - 1)
          }}
        >
          --
        </button>
        Columns:
        <button
          onClick={() => {
            setColumns(prev => prev + 1)
          }}
        >
          ++
        </button>
        <button
          onClick={() => {
            setColumns(prev => prev - 1)
          }}
        >
          --
        </button>
      </ButtonsWrapper>
      <Grid>
        {imagesByColumn.map((photos, index) => (
          <Column key={index} photos={photos} />
        ))}
      </Grid>
    </>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const GridItem = styled.div``

const ButtonsWrapper = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
`

export default Masonry
