import gql from 'graphql-tag';

export const entries = gql`
  fragment entries on TreeEntry {
    name
    type
    mode
  }
`;