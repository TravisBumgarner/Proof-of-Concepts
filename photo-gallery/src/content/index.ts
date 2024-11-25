import { type GalleryType, type PhotoType, type PrivateGallery } from 'types'
import output from './output.json'
// import rickyAndTif from './ricky-and-tif.json'

interface Data {
  photos: Record<string, PhotoType>
  galleries: Record<string, GalleryType>
  privateGalleries: Record<string, PrivateGallery>
}

const getData = (): Data => {
  return {
    photos: output.photos,
    galleries: output.galleries,
    privateGalleries: {
      // 'ricky-and-tif': rickyAndTif
    }
  }
}

export default getData