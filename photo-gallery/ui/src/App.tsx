import React from 'react'
import Context from './context'
import Resize from './Resize'

const App = () => {
  // return <PhotoMasonry />
  return <Resize />
}

const WrappedApp = () => {
  return (
    <Context>
      <App />
    </Context>
  )
}

export default WrappedApp
