import React, { useContext } from 'react'
import Context, { context } from './context'
import { getPhotoUrl } from './utils'

const App = () => {
  const {
    state: { photos }
  } = useContext(context)

  return (
    <img
      src={getPhotoUrl({
        isThumbnail: false,
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
