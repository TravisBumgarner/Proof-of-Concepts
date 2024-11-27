import { motion, useAnimationControls, useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { type PhotoType } from 'types'
import { PHOTO_SPACING } from './consts'
import { getPhotoUrl } from './utils'

const Cell = ({ vibrantcolors: { vibrant, lightVibrant }, src }: PhotoType) => {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const isInView = useInView(ref, { amount: 0.5 })

  const wasInView = useRef(false)

  useEffect(() => {
    const movedOntoScreen = !wasInView.current && isInView
    const movedOffOfScreen = wasInView.current && !isInView

    if (movedOntoScreen) {
      void controls.start('fadeIn')
    }

    if (movedOffOfScreen) {
      void controls.start('fadeOut')
    }

    wasInView.current = isInView
  }, [controls, isInView])

  return (
    <StyledCell
      ref={ref}
      $opacity={isInView ? 1 : 0}
      $hoverBorderColor={vibrant!}
      $borderColor={lightVibrant!}
      animate={controls}
      transition={{
        duration: 0.4
      }}
      variants={{
        fadeIn: {
          opacity: [0, 1]
        },
        fadeOut: {
          opacity: [1, 0]
        }
      }}
    >
      <StyledImage
        src={getPhotoUrl({
          isThumbnail: true,
          photoSrc: src
        })}
      />
    </StyledCell>
  )
}

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

const StyledCell = styled(motion.div)<{
  $borderColor: string
  $hoverBorderColor: string
  $opacity: number
}>`
  border: ${props => `4px solid ${props.$borderColor}`};
  margin: ${PHOTO_SPACING} 0;
  opacity: ${props => `${props.$opacity}`};
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${props => `${props.$hoverBorderColor}`};
  }
`

export default Cell
