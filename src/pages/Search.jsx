import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';


import { useParams } from 'react-router-dom';
import { GET_DATA } from '../queries/Search.js'
import Spinner from './Spinner.jsx'




export function Search() {
    let { query } = useParams();


    const { error, loading, data } = useQuery(GET_DATA, {
        variables: { "query": query },
        fetchPolicy: "network-only"
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
            alignSelf: 'center',
            bgcolor: 'background.paper',
            borderRadius: '10px 10px 0 0'
        }}>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '24px',
                    marginBottom: '25px'
                }}
            >Repositories</Typography>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '14px',
                    marginBottom: '25px'
                }}
            >{`Query: ${query}`}</Typography>
            {data.search.edges.map(edge => (
                <ListItem
                    sx={{
                        marginLeft: '25px'
                    }}
                    key={edge.node.id}
                    disableGutters
                >
                    <Link className='link' to={`/repo/${edge.node.owner.login}/${edge.node.name}`}>
                        <Typography
                            sx={{

                                fontSize: '10px'
                            }}
                        >
                            {`Repository name: ${edge.node.name}, owner:${edge.node.owner.login}`}
                        </Typography>
                    </Link>

                </ListItem>
            ))}

        </List>
    )
}