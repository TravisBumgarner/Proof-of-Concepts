import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { type PhotoType } from 'types'
import { context } from './context'
import { getPhotoUrl } from './utils'

const PHOTO_SPACING = '8px'

const StyledImage = styled.img`
  border: 20px solid #bbb;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: block; // Removes descender issues for display: inline.

  transition: border-color 0.2s ease-in-out;

  &: hover {
    border-color: #fff;
  }
`

const StyledCell = styled.div<{
  $borderColor: string
  $hoverBorderColor: string
}>`
  border: ${props => `4px solid ${props.$borderColor}`};
  margin: ${PHOTO_SPACING} 0;

  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${props => `${props.$hoverBorderColor}`};
  }
`

const Cell = ({
  vibrantcolors: { darkVibrant, lightVibrant },
  src
}: PhotoType) => {
  return (
    <StyledCell $hoverBorderColor={lightVibrant!} $borderColor={darkVibrant!}>
      <StyledImage
        src={getPhotoUrl({
          isThumbnail: true,
          photoSrc: src
        })}
      />
    </StyledCell>
  )
}

const StyledColumn = styled.div<{ $columnCount: number }>`
  display: flex;
  flex-direction: column;
  margin: 0 ${PHOTO_SPACING};
  flex-basis: calc(100% / ${props => props.$columnCount});
`

const Column = ({
  photos,
  columnCount
}: {
  photos: PhotoType[]
  columnCount
}) => {
  return (
    <StyledColumn $columnCount={columnCount}>
      {photos.map(photo => (
        <Cell key={photo.id} {...photo} />
      ))}
    </StyledColumn>
  )
}

const PhotoMasonry = () => {
  const [photoCount, setPhotoCount] = useState(11)
  const [columns, setColumns] = useState(5)

  const {
    state: { photos }
  } = useContext(context)

  const imagesByColumn = useMemo(() => {
    // Grab photos one at a time.
    // Use photos hardcoded widths and heights to calculate things. Makes it easier for resize

    const columnHeights = Array<number>(columns).fill(0)
    const output = Array.from({ length: columns }, () => [] as PhotoType[])

    Object.values(photos)
      .slice(0, photoCount)
      .forEach(photo => {
        // All photos will have a width of 1 unit.
        // Calculate height based on aspect ratio and we'll use that to determine
        // which column to put it in.
        const unitHeight = photo.height / photo.width

        const columnforCurrentPhoto = columnHeights.indexOf(
          Math.min(...columnHeights)
        )
        // This algorithm does not account for the spacing between photos.
        // So if a column has many landscape photos, there's lots of vertical
        // padding that this algorithm doesn't account for. This is a small factor of safety.

        const FACTOR_OF_SAFETY = photo.height > photo.width ? 0.9 : 1.1
        columnHeights[columnforCurrentPhoto] += unitHeight * FACTOR_OF_SAFETY
        console.log(JSON.stringify(columnHeights))
        output[columnforCurrentPhoto].push(photo)
      })

    return output
  }, [photos, columns, photoCount])
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
      <Table>
        {imagesByColumn.map((photos, index) => (
          <Column columnCount={columns} key={index} photos={photos} />
        ))}
      </Table>
    </>
  )
}

const Table = styled.div`
  display: flex;
  flex-direction: row;
`

const ButtonsWrapper = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  color: #eee;
  background-color: #333;
  padding: 8px;
  border-radius: 4px;
`

export default PhotoMasonry
