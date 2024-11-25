import fs from 'fs'
import path from 'path'
import processPhoto from './process-photo'
import { type Metadata } from './types'

const VALID_EXTENSIONS = ['.jpg']

const main = async (directoryPath: string) => {
  const photos: Record<string, Metadata> = {}

  try {
    const files = fs.readdirSync(directoryPath)

    console.log('Running...')
    for (const file of files) {
      console.log('\tProcessing', file)
      if (!VALID_EXTENSIONS.includes(path.extname(file))) {
        console.log('\tSkipping for invalid file type', path.extname(file))
        continue
      }

      const filePath = path.join(directoryPath, file)

      const metadata = await processPhoto(filePath)

      photos[metadata.id] = metadata
    }

    const data = JSON.stringify({
      photos
    })

    const filePath = './output.json'
    fs.writeFileSync(filePath, data)
  } catch (err) {
    console.log('Unable to scan directory: ' + err)
  }
}

const PHOTO_DIR = '/Users/travisbumgarner/Desktop/large'

void main(PHOTO_DIR)
