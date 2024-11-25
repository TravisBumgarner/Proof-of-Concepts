import React, { useLayoutEffect, useRef, useState } from 'react'

import './resize.css'

// Define the types
interface Photo {
  id: number
  url: string
}

interface ColumnProps {
  photos: Photo[]
}

const Column: React.FC<ColumnProps> = ({ photos }) => (
  <div className="column">
    {photos.map(photo => {
      const random = `#${Math.floor(Math.random() * 16777215).toString(16)}`
      return (
        <div
          className="photo"
          key={photo.id}
          style={{
            backgroundColor: random,
            width: 100,
            height: 100,
            margin: 10
          }}
        >
          {photo.id}
        </div>
      )
    })}
  </div>
)

const App: React.FC = () => {
  const [columns, setColumns] = useState(2) // Start with 2 columns
  const [imagesByColumn, setImagesByColumn] = useState<Photo[][]>(() =>
    splitIntoColumns(2, photos)
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Step 1: Capture initial positions
    const photoElements = Array.from(
      container.querySelectorAll<HTMLDivElement>('.photo')
    )
    const initialPositions = photoElements.map(photo =>
      photo.getBoundingClientRect()
    )

    // Step 2: Trigger layout change
    setImagesByColumn(splitIntoColumns(columns, photos))

    // Step 3: Wait for layout to update and capture new positions
    requestAnimationFrame(() => {
      const newPhotoElements = Array.from(
        container.querySelectorAll<HTMLDivElement>('.photo')
      )
      const newPositions = newPhotoElements.map(photo =>
        photo.getBoundingClientRect()
      )

      // Step 4: Apply transforms to reflect positional differences
      newPhotoElements.forEach((photo, index) => {
        const deltaX = initialPositions[index].left - newPositions[index].left
        const deltaY = initialPositions[index].top - newPositions[index].top
        photo.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      })

      // Step 5: Animate items into their new positions
      requestAnimationFrame(() => {
        newPhotoElements.forEach(photo => {
          photo.style.transition = 'transform 0.3s ease'
          photo.style.transform = 'translate(0, 0)'
          photo.addEventListener(
            'transitionend',
            () => {
              photo.style.transition = ''
              photo.style.transform = ''
            },
            { once: true }
          )
        })
      })
    })
  }, [columns, photos]) // Add 'photos' dependency to detect reorder changes``

  function toggleColumns() {
    setColumns(columns === 2 ? 3 : 2) // Toggle between 2 and 3 columns
  }

  return (
    <div>
      <button onClick={toggleColumns}>Toggle Columns</button>
      <div className="container" ref={containerRef}>
        {imagesByColumn.map((photos, index) => (
          <Column key={`column-${index}`} photos={photos} />
        ))}
      </div>
    </div>
  )
}

// Helper function to split photos into columns
function splitIntoColumns(columnCount: number, photos: Photo[]): Photo[][] {
  const columns: Photo[][] = Array.from({ length: columnCount }, () => [])
  photos.forEach((photo, index) => {
    const randomColumnIndex = Math.floor(Math.random() * columnCount)
    columns[randomColumnIndex].push(photo)
  })
  return columns
}

// Example photos
const photos: Photo[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  url: `https://via.placeholder.com/150?text=${i + 1}`
}))

export default App
