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

  getRepository() {
    const repo = gql`
    query Repo($name: String!, $owner: String!, $branch: String!){
      repository(name: $name, owner: $owner) {
        sshUrl
        url
        object(expression: $branch) {
          ... on Tree {
            entries {
              name
              type
              mode
            }
          }
        }
      }
    }
    `;
    return repo;
  }

  getCommits(){
    const commits = gql`
    query Commits($name: String!, $owner: String!){
      repository(name: $name, owner: $owner) {
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(first: 20) {
                edges {
                  node {
                    message
                    author {
                      name
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
    return commits;
  }

  getContent(){
    const content = gql`
    query content($name: String!, $owner: String!, $file: String!){
      repository(name:$name, owner:$owner){
        object(expression: $file) {
        ...on Blob {
            text
        }
    }
      }
    }
    `;
    return content;
  }
}
