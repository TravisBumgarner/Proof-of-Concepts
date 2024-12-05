import React from 'react'
import Context from './context'
// import PhotoMasonry from './Masonry'
// import Resize2 from './Resize2'
import SinglePhotoView from './SinglePhotoView'
const App = () => {
  // return <PhotoMasonry />
  // return <Resize />
  // return <Resize2 />
  return <SinglePhotoView />
}

const WrappedApp = () => {
  return (
    <Context>
      <App />
    </Context>
  )
}

export default WrappedApp
