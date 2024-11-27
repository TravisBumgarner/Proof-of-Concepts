export const getPhotoUrl = ({
  isThumbnail,
  photoSrc
}: {
  isThumbnail: boolean
  privateGalleryId?: string | null
  photoSrc: string
}) => {
  let url = '/images/'

  url += isThumbnail ? 'thumbnail/' : 'large/'
  url += encodeURIComponent(photoSrc)

  console.log('url', url)
  return url
}
