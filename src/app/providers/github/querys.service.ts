import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

// Models
import { Repositorios } from '../../models/repositorios';

@Injectable({
  providedIn: 'root'
})
export class QuerysService {

  constructor() { }

  getRepositories( ) {
    const repositories = gql`
      query Repositories($user: String!){
        user(login: $user){
          name
          repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}){
            nodes{
              name
              description
              primaryLanguage {
                name
                color
              }
              pushedAt
            }
          }
        }
      }
      `;
    return repositories;
  }

  searchRepository( ) {
    const repository = gql`
        query Repository($name: String!, $owner: String!){
          repository(name:$name owner: $owner){
            name
            description
            primaryLanguage{
              name
              color
            }
          pushedAt
        }
      }
      `;
    return repository;
  }
}
