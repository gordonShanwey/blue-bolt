import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Button from '@mui/material/Button';
import { GET_VIEWER } from '../queries/ViewerQuery.js'
import Typography from '@mui/material/Typography';
import Spinner from './Spinner.jsx'












export default function User() {
  const { error, loading, data,fetchMore } = useQuery(GET_VIEWER, {
    variables:{after:null}
  });
  console.log({ error, loading, data });
  if (loading) return (<Spinner />);

  if (error) return (<div>error</div>);





  return (
    
    <List sx={{
      width: '50%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      marginTop: '2rem',
     alignSelf:'center',
      bgcolor: 'background.paper',
      borderRadius:'10px 10px 0 0'
    }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '24px',
          marginBottom:'25px'
      }}
      >Repositories</Typography>
      {data.viewer.repositories.edges.map(edge => (
        <ListItem
          sx={{
            marginLeft:'25px'
          }}
          key={edge.node.name}
          disableGutters
         >
          <Link className='link' to={`/repo/${edge.node.owner.login}/${edge.node.name}`}>
            <Typography
              sx={{
                
                fontSize: '18px'
              }}
            >
              {edge.node.name}
            </Typography>
          </Link>
         
        </ListItem>
      ))}
      <Button 
        variant='outlined'
        sx={{
          
        }}
        onClick={() => {
          const { endCursor } = data.viewer.repositories.pageInfo;

          fetchMore({
            variables: { after: endCursor },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              fetchMoreResult.viewer.repositories.edges = [
                ...prevResult.viewer.repositories.edges,
                ...fetchMoreResult.viewer.repositories.edges
              ];
              return fetchMoreResult;
            }

          })
      }}
      >
        More repositories
      </Button>
    </List>
  );
}
