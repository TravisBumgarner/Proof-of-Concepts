import { motion, useAnimationControls } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './Resize2.css' // Create styles for .fullscreen-box and other required animations.

const VARIANTS_ENTER_FULL_SCREEN = 'enterFullScreen'
const VARIANTS_EXIT_FULL_SCREEN = 'exitFullScreen'

const FullscreenElement = () => {
  const [fullscreen, setFullscreen] = useState<any>(null) // Track which element is fullscreen.
  const controls = useAnimationControls()

  const handleFullscreenClick = (id, rect) => {
    // Save the id and dimensions of the clicked element.
    setFullscreen({ id, rect })
  }

  // Wait for the fullscreen element to render before scaling it.
  useEffect(() => {
    if (fullscreen !== null) {
      void controls.start(VARIANTS_ENTER_FULL_SCREEN)
    }
  }, [fullscreen, controls])

  const handleAnimationComplete = variant => {
    if (variant === VARIANTS_EXIT_FULL_SCREEN) {
      setFullscreen(null)
    }
  }

  const handleCloseFullscreen = () => {
    // Remaining cleanup done in handleAnimationComplete
    void controls.start(VARIANTS_EXIT_FULL_SCREEN)
  }

  return (
    <div className="container">
      {/* Sample boxes */}
      {[1, 2, 3].map(id => (
        <div
          key={id}
          className={`box ${fullscreen?.id === id ? 'fullscreen-box' : ''}`}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            handleFullscreenClick(id, rect)
          }}
        >
          Box {id}
        </div>
      ))}

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
          animate={controls}
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
            Fullscreen Box {fullscreen.id}
            <button onClick={handleCloseFullscreen}>Close</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FullscreenElement
