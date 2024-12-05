import BaseHtmlElements from './BaseHtmlElements'
import Config from './Config'
import Sidebar from './Sidebar'
import Explorations from './explorations'
import './fonts.css'

function App() {
  return (
    <>
      <Sidebar sidebar={<Config />} />
      <BaseHtmlElements />
      <Explorations />
    </>
  )
}

export default App
