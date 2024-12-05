import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import React, { useState } from 'react'
import getData from './content'
import { getPhotoUrl } from './utils'

const SinglePhotoView = () => {
  const { photos } = getData()
  const photoArray = Object.values(photos)
  const [currentIndex, setCurrentIndex] = useState(0)
  const animate = useAnimationControls()

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % photoArray.length)
  }

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + photoArray.length) % photoArray.length
    )
  }

  const triggerFadein = () => {
    animate.start({ opacity: 1 })
  }

  const triggerFadeout = () => {
    animate.start({ opacity: 0 })
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence>
        <motion.img
          animate={animate}
          key={photoArray[currentIndex].id}
          src={getPhotoUrl({
            photoSrc: photoArray[currentIndex].src,
            isThumbnail: false
          })}
          alt={`Photo ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute'
          }}
        />
      </AnimatePresence>
      <div style={{ position: 'fixed', top: 0, left: 0 }}>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={triggerFadein}>Fade In</button>
        <button onClick={triggerFadeout}>Fade Out</button>
      </div>
    </div>
  )
}

export default SinglePhotoView
