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

const GetColors = gql`
query GetColors {
    colors 
}
`

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [colors, setColors] = React.useState<string[]>([])

  useQuery<{colors: string[]}>(GetColors, {
    onCompleted: (data) => {
      setColors(data.colors)
      setIsLoading(false)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
      setIsLoading(false)
    },
  })

  if(isLoading) <p>Loading...</p>

  return (
    <Body>
      <Title>Canvas</Title>
      <div>
        {colors.map((color, index) => (
          <FakePixel
            color={color}
            key={index}
            onClick={() => console.log('dispatching new color')}
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
