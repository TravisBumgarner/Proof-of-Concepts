import { encode } from 'blurhash'
import { createCanvas, loadImage, type Image } from 'canvas'

const loadImageNode = async (src: string): Promise<Image> => {
  return await loadImage(src)
}

const getImageData = (image: Image) => {
  const canvas = createCanvas(image.width, image.height)
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  return context.getImageData(0, 0, image.width, image.height)
}

export const encodeImageToBlurHash = async (
  filePath: string
): Promise<{ blurHash: string; width: number; height: number }> => {
  const image = await loadImageNode(filePath)

  // faster processing by using a smaller image
  const smallImage = await loadImageNode(filePath.replace('large', 'thumbnail'))

  const imageData = getImageData(smallImage)
  return {
    blurHash: encode(imageData.data, imageData.width, imageData.height, 4, 4),
    width: image.width,
    height: image.height
  }
}
