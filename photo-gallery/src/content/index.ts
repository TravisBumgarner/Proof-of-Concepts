import { type PhotoType } from 'types'
import output from './output.json'
// import rickyAndTif from './ricky-and-tif.json'

interface Data {
  photos: Record<string, PhotoType>
  // galleries: Record<string, GalleryType>
}

const getData = (): Data => {
  return {
    photos: output.photos
    // galleries: output.galleries
  }
}

export default getData
