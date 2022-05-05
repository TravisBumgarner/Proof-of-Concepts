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

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5001/graphql',
}));

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});


import { Body, Title } from 'sharedComponents'

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
    colors 
}
`

const COLORS_SUBSCRIPTION = gql`
  subscription ColorFeed {
    colorCreated 
  }
`;


enum ValidColors {
   RED = "RED",
   GREEN = "GREEN",   
   BLUE = "BLUE",
   BLACK = "BLACK"   
}

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [colors, setColors] = React.useState<string[]>([])
  const [selectedColor, setSelectedColor] = React.useState<string>('black')

  useQuery<{colors: string[]}>(COLORS_QUERY, {
    onCompleted: (data) => {
      setColors(data.colors)
      setIsLoading(false)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
      setIsLoading(false)
    },
  })

  useSubscription<{colors: string[]}>(COLORS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      console.log('data received from subscription')
      console.log(data.subscriptionData.data)
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
        {Object.values(ValidColors).map((color) => (
          <FakePixel
            color={color}
            key={color}
            onClick={() => setSelectedColor(color)}
          />)
        )}
      </div>
      <Title>Selected Color</Title>
      <div>
          <FakePixel
            color={selectedColor}
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
