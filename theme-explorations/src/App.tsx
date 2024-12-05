import styled from 'styled-components'
import Sidebar from './Sidebar'
import Config from './Config'

const H1 = styled.h1`
  color: red;
`

const H2 = styled.h2`
  color: blue;
`


function App() {
  return (
    <Sidebar sidebar={<Config />}/>
     

  )
}

export default App
