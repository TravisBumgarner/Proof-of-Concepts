import React from 'react'
import Context from './context'
import Masonry from './Masonry'

const App = () => {
  return <Masonry />
}

const WrappedApp = () => {
  return (
    <Context>
      <App />
    </Context>
  )
}

export default WrappedApp
