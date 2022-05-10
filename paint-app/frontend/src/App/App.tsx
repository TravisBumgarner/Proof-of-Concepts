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
import { BrowserRouter } from 'react-router-dom'

import Navigation from './Navigation';
import Router from './Router';
import { GlobalStyle } from 'theme';

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



const ContentWrapper = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`



const WrappedApp = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ApolloProvider client={apolloClient}>
        <Navigation />
        <ContentWrapper>
          <Router />
        </ContentWrapper>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default WrappedApp
