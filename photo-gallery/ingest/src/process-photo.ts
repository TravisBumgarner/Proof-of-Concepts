import { v5 as uuidv5 } from 'uuid'
import { encodeImageToBlurHash } from './blur-hash'
import { type Metadata } from './types'
import getVibrant from './vibrant'

const PHOTO_DIR = '/Users/travisbumgarner/Desktop/large'

export const generatePhotoId = (filename: string) => {
  const PHOTOS_NAMESPACE = 'deadbeef-beef-491e-99b0-da01ff1f3341'
  return uuidv5(filename, PHOTOS_NAMESPACE)
}

const VALID_EXTENSIONS = ['jpg']

const processPhoto = async (filepath: string): Promise<Metadata> => {
  const extension = filepath.split('.').slice(-1)[0]
  if (!extension || !VALID_EXTENSIONS.includes(extension)) {
    throw Error('invalid file type')
  }
  const { blurHash, width, height } = await encodeImageToBlurHash(filepath)

  const vibrant = await getVibrant(filepath)
  return {
    src: filepath.replace(PHOTO_DIR, ''),
    id: generatePhotoId(filepath),
    blurHash,
    width,
    height,
    vibrantcolors: vibrant
  }
}

export default processPhoto
