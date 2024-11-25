import Vibrant from 'node-vibrant'

const getVibrant = async (filePath: string) => {
  const vibrant = new Vibrant(filePath)
  const result = await vibrant.getPalette()
  return {
    vibrant: result.Vibrant?.hex,
    darkVibrant: result.DarkVibrant?.hex,
    lightVibrant: result.LightVibrant?.hex,
    muted: result.Muted?.hex,
    darkMuted: result.DarkMuted?.hex,
    lightMuted: result.LightMuted?.hex
  }
}

export default getVibrant
