import * as React from 'react'
import styled from 'styled-components'
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
  useSubscription,
  split,
  HttpLink
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { Body, Title } from 'sharedComponents'

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5001/graphql',
}));

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

const FakePixel = styled.button`
  border: 0;
  background-color: ${({ color }) => color};
  width: 50px;
  height: 50px;
  margin: 1px;
`

const COLORS_QUERY = gql`
query ColorsQuery {
    colors {
      color,
      index
    }
}
`

const COLORS_SUBSCRIPTION = gql`
  subscription ColorFeed {
    colorCreated {
      color,
      index
    }
  }
`;

type ColorMessage = {
  index: number
  color: string
}[]


const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [colors, setColors] = React.useState<string[]>([])
  const [selectedColor, setSelectedColor] = React.useState<string>('#000000')

  const handleNewColors = (colors: ColorMessage) => {
    setColors(prev => {
      const updatedColors = [...prev]
      colors.forEach(({index, color}) => updatedColors[index] = color)
      return updatedColors
    })
  }

  useQuery<{colors: ColorMessage}>(COLORS_QUERY, {
    onCompleted: (data) => {
      handleNewColors(data.colors)
      setIsLoading(false)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
      setIsLoading(false)
    },
  })

  useSubscription<{colorCreated: ColorMessage}>(COLORS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      console.log(data)
      handleNewColors(data.subscriptionData.data.colorCreated)
    }
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
            onClick={() => setColors(prev => {
              const modifiedColors = [...prev]
              modifiedColors[index] = selectedColor
              return modifiedColors
            })}
          />))}
      </div>
      <Title>Color Picker</Title>
      <div>
          <input
            type="color"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
          />
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
