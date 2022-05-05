import * as React from 'react'
import styled from 'styled-components'
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client'

import { Body, Title } from 'sharedComponents'

const apolloClient = new ApolloClient({
  uri: `http://localhost:5001/graphql`,
  cache: new InMemoryCache()
});

const FakePixel = styled.button`
  border: 0;
  background-color: ${({ color }) => color};
  width: 50px;
  height: 50px;
`

const PING = gql`
query Ping {
    ping
}
`

const COLORS = ['red', 'green', 'blue', 'yellow']

const getRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)];

const App = () => {
  useQuery<String>(PING, {
    onCompleted: (data) => {
      console.log("GraphQL Response", data)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
  })

  const [colors, setColors] = React.useState<string[]>(COLORS)
  return (
    <Body>
      <Title>Canvas</Title>
      <div>
        {colors.map((color, index) => (
          <FakePixel
            color={color}
            key={index}
            onClick={() => setColors(prev => {
              const newColors = [...prev]
              newColors[index] = getRandomColor(COLORS)
              return newColors
            })}
          />)
        )}
      </div>
    </Body>
  )
}

const WrappedApp = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  )
}

export default WrappedApp
