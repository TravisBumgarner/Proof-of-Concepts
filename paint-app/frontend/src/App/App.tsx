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
  HttpLink,
  useMutation
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { Body, Title } from 'sharedComponents'

import { ROOMS, ColorMessage } from '../../../shared/types'


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

const PIXEL_LENGTH = 20
const PIXELS_PER_ROW = 10

const FakePixel = styled.div`
  border: 0;
  background-color: ${({ color }) => color};
  width: ${PIXEL_LENGTH}px;
  height: ${PIXEL_LENGTH}px;
  margin: 0px;
  padding: 0;
  line-height: 0;
  display: inline-block;
  font-size: 0;
`

const FakePixelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${PIXELS_PER_ROW * PIXEL_LENGTH}px;
`

const COLORS_QUERY = gql`
  query ColorsQuery($room: Room!) {
    colors(room: $room) {
      color,
      pixelIndex
    }
  }
`

const COLORS_SUBSCRIPTION = gql`
  subscription ColorFeed {
    colorCreated {
      color,
      pixelIndex,
      room
    }
  }
`;


const CREATE_COLOR_MUTATION = gql`
  mutation CreateColor($pixelIndex: Int!, $color: String!, $room: Room!) {
    createColor(pixelIndex: $pixelIndex, color: $color, room: $room) {
      color,
      pixelIndex
    }
  }
`;

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [colors, setColors] = React.useState<string[]>([])
  const [selectedColor, setSelectedColor] = React.useState<string>('#000000')
  const [room, setRoom] = React.useState<ROOMS | ''>(ROOMS.abstract)
  const [createColor, { data, loading, error }] = useMutation(CREATE_COLOR_MUTATION);

  const handleNewColors = (colors: ColorMessage) => {
    setColors(prev => {
      const updatedColors = [...prev]
      colors.forEach(({ pixelIndex, color }) => updatedColors[pixelIndex] = color)
      return updatedColors
    })
  }

  useQuery<{ colors: ColorMessage }>(COLORS_QUERY, {
    variables: {
      room
    },
    skip: room === '',
    onCompleted: (data) => {
      handleNewColors(data.colors)
      setIsLoading(false)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
      setIsLoading(false)
    },
  })


  useSubscription<{ colorCreated: ColorMessage }>(COLORS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      console.log(data.subscriptionData.data)
      if (data.subscriptionData.data.colorCreated[0].room === room) {
        handleNewColors(data.subscriptionData.data.colorCreated)
      }
    }
  })

  const PickARoom = (
    <select value={room} onChange={(event) => setRoom(event.target.value as ROOMS)}>
      <option value={''}>Pick One</option>
      {
        Object.keys(ROOMS).map((key: keyof typeof ROOMS) => <option key={key} value={key}>{ROOMS[key]}</option>)
      }
    </select>
  )

  if (isLoading) <p>Loading...</p>

  if (!room) {
    return (
      <Body>
        {PickARoom}
      </Body>
    )
  }

  return (
    <Body>
      {PickARoom}
      <Title>You're Drawing in {room}</Title>
      <FakePixelWrapper>
        {colors.map((color, pixelIndex) => (
          <FakePixel
            color={color}
            key={pixelIndex}
            onClick={() => createColor({ variables: { pixelIndex, color: selectedColor, room } })}
          />))}
      </FakePixelWrapper>
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
