import {gql} from "@apollo/client"


export const GET_REPO = gql`

query MyQuery($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    defaultBranchRef {
      target {
        ... on Commit {
          id
          history (first:10) {
            totalCount
            nodes {
		          message
              id
           }
          }
          repository {
            name
            owner {
              
              login
            }
            description
            issues(first: 10) {
              totalCount
              nodes {
                id
               title
              }
            }
            releases(first: 10) {
              totalCount
              nodes {
                name
                id
              }
            }
          }
        }
      }
    }
  }
}
`