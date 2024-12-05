import { useState } from 'react'
import styled from 'styled-components'
import { HeaderCAD } from '../explorations/HeaderCAD'

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 0 4px 4px 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  transform: translateX(${props => props.$isHidden ? '-90%' : '0'});

  &:hover {
    transform: translateX(0);
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  cursor: pointer;
  padding: 0.5rem 1rem;
  
  &:hover {
    background: #e0e0e0;
  }
`

// Map of all exploration components
const explorations = {
  'HeaderCAD': HeaderCAD,
  // Add more explorations here as you create them
}

export const ExplorationsNav = ({ onSelect }) => {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <Container $isHidden={isHidden}>
      <List>
        {Object.keys(explorations).map((name) => (
          <ListItem 
            key={name}
            onClick={() => {
              onSelect(explorations[name])
              setIsHidden(true)
            }}
          >
            {name}
          </ListItem>
        ))}
      </List>
    </Container>
  )
} 