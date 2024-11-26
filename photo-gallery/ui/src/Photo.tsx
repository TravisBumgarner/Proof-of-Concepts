import React from 'react'
import styled from 'styled-components'
import { type PhotoType } from 'types'
import { PHOTO_SPACING } from './consts'
import { getPhotoUrl } from './utils'

const StyledImage = styled.img`
  border: 20px solid #bbb;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: block; // Removes descender issues for display: inline.

  transition: border-color 0.2s ease-in-out;

  & :hover {
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

export default Cell
