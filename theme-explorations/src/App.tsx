import { Route, Routes } from 'react-router-dom'
import BaseHtmlElements from './BaseHtmlElements'
import Config from './Config'
import EngineeringDoc from './EngineeringDoc'
import EngineeringDoc2 from './EngineeringDoc2'
import Sidebar from './Sidebar'
import Explorations from './explorations'
import './fonts.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseHtmlElements />} />
        <Route path="/explorations" element={<Explorations />} />
        <Route path="/engineeringdoc" element={<EngineeringDoc />} />
        <Route path="/engineeringdoc2" element={<EngineeringDoc2 />} />
      </Routes>
      <Sidebar sidebar={<Config />} />
    </>
  )
}

export default App
