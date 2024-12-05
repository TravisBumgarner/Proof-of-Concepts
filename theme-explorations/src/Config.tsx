import { useState } from 'react'

const Config = () => {
  const [font, setFont] = useState('')
  const [fontWeight, setFontWeight] = useState('')

  const applyFont = (newFont: string) => {
    if (font) {
      // Check if font is not an empty string
      document.body.classList.remove(font)
    }
    document.body.classList.add(newFont)
    setFont(newFont)
  }

  const applyFontWeight = (newFontWeight: string) => {
    if (fontWeight) {
      document.body.classList.remove(fontWeight)
    }
    document.body.classList.add(newFontWeight)
    setFontWeight(newFontWeight)
  }

  return (
    <div>
      <h2>Fonts</h2>
      <ul>
        <li className="doto">
          Doto <button onClick={() => applyFont('doto')}>Apply</button>
        </li>
        <li className="cutive">
          Cutive <button onClick={() => applyFont('cutive')}>Apply</button>
        </li>
      </ul>

      <h2>Font Weight</h2>
      <ul>
        <li>
          Normal
          <button onClick={() => applyFontWeight('normal')}>Apply</button>
        </li>
        <li>
          Bold
          <button onClick={() => applyFontWeight('bold')}>Apply</button>
        </li>
        <li>
          Light
          <button onClick={() => applyFontWeight('light')}>Apply</button>
        </li>
      </ul>
    </div>
  )
}

export default Config
