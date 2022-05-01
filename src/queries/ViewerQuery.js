import { gql } from '@apollo/client'


export const GET_VIEWER = gql`
query MyQuery($after: String) {
  
  viewer {
    repositories(first: 2, after: $after) {
      edges {
        node {
          owner {
            id
            login
          }
          name
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
}

`