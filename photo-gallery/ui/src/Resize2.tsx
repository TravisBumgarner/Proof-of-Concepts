import { motion, useAnimationControls } from 'framer-motion'
import React, { useState } from 'react'
import './Resize2.css' // Create styles for .fullscreen-box and other required animations.

const FullscreenElement = () => {
  const [fullscreen, setFullscreen] = useState<any>(null) // Track which element is fullscreen.
  const controls = useAnimationControls()

  const handleFullscreenClick = (id, rect) => {
    // Save the id and dimensions of the clicked element.
    setFullscreen({ id, rect })

    setTimeout(() => {
      void controls.start('fullScreen')
    }, 1000)
  }

  const handleCloseFullscreen = () => {
    void controls.start('exitFullScreen')

    // setFullscreen(null) // Exit fullscreen.
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
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            position: 'fixed',
            top: fullscreen.rect.top,
            left: fullscreen.rect.left,
            width: fullscreen.rect.width,
            height: fullscreen.rect.height,
            transform: 'translate(0, 0)',
            transition: 'all 3s ease'
          }}
          animate={controls}
          variants={{
            fullScreen: {
              backgroundColor: 'rgba(0,255,0,0.8)',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh'
            },
            exitFullScreen: {
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
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FullscreenElement
