import { useEffect, useRef } from 'react'

export const getPhotoUrl = ({
  isThumbnail,
  privateGalleryId,
  photoSrc
}: {
  isThumbnail: boolean
  privateGalleryId?: string | null
  photoSrc: string
}) => {
  let url = 'https://storage.googleapis.com/photo21-asdqwd/photos/'
  if (privateGalleryId) {
    url += `${privateGalleryId}/`
  }

  url += isThumbnail ? 'thumbnail/' : 'large/'
  url += encodeURIComponent(photoSrc)
  return url
}

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useEffectDebugger = (
  effectHook,
  dependencies,
  dependencyNames = []
) => {
  const previousDeps = usePrevious(dependencies, [])

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency
        }
      }
    }

    return accum
  }, {})

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger] ', changedDeps)
  }

  useEffect(effectHook, dependencies)
}
