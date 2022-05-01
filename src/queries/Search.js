import { gql } from '@apollo/client'


export const GET_DATA = gql`
query MyQuery($query:String!){
  search(query: $query, type: REPOSITORY, first: 10) {
    edges {
      node {
        ... on Repository {
          descriptionHTML
          id
          name
          owner {
            login
          }
        }
      }
    }
  }
}

`