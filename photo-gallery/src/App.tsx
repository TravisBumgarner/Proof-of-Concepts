import React, { useContext } from 'react'
import Context, { context } from './context'
import { getPhotoUrl } from './utils'

const App = () => {
  const {
    state: { photos }
  } = useContext(context)

  return (
    <img
      style={{
        border: `10px solid ${
          photos[Object.keys(photos)[0]].vibrantcolors.vibrant
        }`
      }}
      src={getPhotoUrl({
        isThumbnail: true,
        photoSrc: Object.values(photos)[1].src
      })}
    />
  )
}

const WrappedApp = () => {
  return (
    <Context>
      <App />
    </Context>
  )
}

export default WrappedApp
