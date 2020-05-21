import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';


const uri = 'https://api.github.com/graphql';
const token = '3aa2bdab94900e44acf6d24574901e1427b1157b';

export function provideApollo(httpLink: HttpLink) {
const basic = setContext((operation, context) => ({
  headers: {
    Accept: 'charset=utf-8'
  }
}));

// Get the authentication token from local storage if it exists
const auth = setContext((operation, context) => ({
  headers: {
    Authorization: `Bearer ${token}`
  },
}));

const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
const cache = new InMemoryCache();


return {
  link,
  cache
};
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
