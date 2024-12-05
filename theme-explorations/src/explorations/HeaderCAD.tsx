import styled from 'styled-components'

const H1 = styled.h1`
  font-size: 64px;
  font-weight: 100;
  border-bottom: 2px solid black;
  display: inline-block;
  text-transform: uppercase;
  padding-right: 64px;
  padding-left: 32px;
  margin: 32px;
`

const HeaderCAD = () => {
  return <H1 className="cutive">Header CAD Sample</H1>
}

export default HeaderCAD
