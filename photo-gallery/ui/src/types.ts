export interface GalleryType {
  title: string
  slug: string
  previewSrc: string
  previewId: string
}

// Types come from vibrant.js in the ingest folder
type VibrantKey =
  | 'vibrant'
  | 'darkVibrant'
  | 'lightVibrant'
  | 'muted'
  | 'darkMuted'
  | 'lightMuted'

export interface PhotoType {
  src: string
  blurHash: string
  vibrantcolors: Record<VibrantKey, string | undefined>
  width: number
  height: number
  id: string
}
