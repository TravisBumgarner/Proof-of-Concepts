export interface GalleryType {
  title: string
  slug: string
  previewSrc: string
  previewId: string
}

export interface PhotoType {
  id: string
  src: string
  galleryIds: string[]
  dateTaken: string
  camera: string
  lens: string
  aperture: string
  shutterSpeed: string
  iso: string
  focalLength: string
  blurHash: string
  width: number
  height: number
}

export interface PrivateGallery {
  gallery: GalleryType
  photos: Record<string, PhotoType>
}
