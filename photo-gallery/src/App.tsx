import React from 'react'
import Context from './context'
import PhotoMasonry from './Masonry'

const App = () => {
  return <PhotoMasonry />
}

const WrappedApp = () => {
  return (
    <Context>
      <App />
    </Context>
  )
}

export default WrappedApp
