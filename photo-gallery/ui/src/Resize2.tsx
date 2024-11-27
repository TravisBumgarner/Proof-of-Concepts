import { motion, useAnimationControls } from 'framer-motion'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { context } from './context'
import { getPhotoUrl } from './utils'

const VARIANTS_ENTER_FULL_SCREEN = 'enterFullScreen'
const VARIANTS_EXIT_FULL_SCREEN = 'exitFullScreen'

interface ThumbnailProps {
  src: string
  id: string
  callback: (id: string, rect: DOMRect) => void
}

const StyledThumbnail = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`

const ThumbnailWrapper = styled.div`
  width: 250px;
`

const Thumbnail = ({ src, callback }: ThumbnailProps) => {
  const handleThumbnailClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      callback(src, rect)
    },
    [callback, src]
  )

  return (
    <ThumbnailWrapper>
      <StyledThumbnail
        src={getPhotoUrl({ photoSrc: src, isThumbnail: true })}
        onClick={handleThumbnailClick}
      />
    </ThumbnailWrapper>
  )
}

const FullscreenElement = () => {
  const {
    state: { photos }
  } = useContext(context)
  const [fullscreen, setFullscreen] = useState<{
    src: string
    rect: DOMRect
  } | null>(null) // Track which element is fullscreen.
  const fullscreenControls = useAnimationControls()
  const buttonControls = useAnimationControls()

  const handleFullscreenClick = (src, rect) => {
    // Save the src and dimensions of the clicked element.
    setFullscreen({ src, rect })
  }

  // Wait for the fullscreen element to render before scaling it.
  useEffect(() => {
    if (fullscreen !== null) {
      void fullscreenControls.start(VARIANTS_ENTER_FULL_SCREEN)
    }
  }, [fullscreen, fullscreenControls])

  const handleAnimationComplete = variant => {
    if (variant === VARIANTS_EXIT_FULL_SCREEN) {
      setFullscreen(null)
    }

    if (variant === VARIANTS_ENTER_FULL_SCREEN) {
      void buttonControls.start('makeVisible')
    }
  }

  const handleCloseFullscreen = () => {
    // Remaining cleanup done in handleAnimationComplete
    void buttonControls.start('hide')
    void fullscreenControls.start(VARIANTS_EXIT_FULL_SCREEN)
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.values(photos).map(photo => (
          <Thumbnail
            callback={handleFullscreenClick}
            key={photo.id}
            id={photo.id}
            src={photo.src}
          />
        ))}
      </div>
      {fullscreen && (
        <motion.div
          onClick={handleCloseFullscreen}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            position: 'fixed',
            top: fullscreen.rect.top,
            left: fullscreen.rect.left,
            width: fullscreen.rect.width,
            height: fullscreen.rect.height
          }}
          onAnimationComplete={handleAnimationComplete}
          animate={fullscreenControls}
          variants={{
            [VARIANTS_ENTER_FULL_SCREEN]: {
              backgroundColor: 'rgba(0,0,0, 1)',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh'
            },
            [VARIANTS_EXIT_FULL_SCREEN]: {
              top: fullscreen.rect.top,
              left: fullscreen.rect.left,
              width: fullscreen.rect.width,
              height: fullscreen.rect.height
            }
          }}
        >
          {/* Fullscreen content */}
          <div className="fullscreen-content">
            <img
              src={getPhotoUrl({
                photoSrc: fullscreen.src,
                isThumbnail: false
              })}
              style={{ width: '100%', height: '100%' }}
            />
            <motion.button
              style={{ opacity: 0, position: 'absolute', right: 16, top: 16 }}
              onClick={handleCloseFullscreen}
              animate={buttonControls}
              transition={{
                duration: 0.2
              }}
              variants={{
                makeVisible: {
                  opacity: [0, 1]
                },
                hide: {
                  opacity: [1, 0]
                }
              }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FullscreenElement
