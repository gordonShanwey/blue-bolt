import React from 'react'

import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import {GET_REPO} from '../queries/RepositoryQuery.js'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Spinner from './Spinner.jsx'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const Repo = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { owner, name } = useParams(); 
  const { error, loading, data } = useQuery(GET_REPO, {
    variables: {
      "name": name,
      "owner": owner
      }
    });
    console.log({ error, loading, data });
    if (loading) return (<Spinner />);

    if (error) return (<div>error</div>);



    return (
      // <div>
      //   <h1>{data.repository.defaultBranchRef.target.repository.name}</h1>
      //   <h1>{data.repository.defaultBranchRef.target.history.totalCount }</h1>
      // </div>
      
       <Box
      sx={{
          width: '50%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          marginTop: '2rem',
          alignSelf: 'center',
          bgcolor: 'background.paper',
          borderRadius: '10px 10px 0 0'
        
      }}
    >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '36px',
            fontWeight:'700',
            marginBottom: '25px'
          }}
        >{data.repository.defaultBranchRef.target.repository.name}</Typography>
      
        <Typography
          sx={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: '400',
            marginBottom: '25px',
            marginLeft: '25px'
          }}
        >{`Opis: ${data.repository.defaultBranchRef.target.repository.description}`}</Typography>
        <Typography
          sx={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: '400',
            marginBottom: '25px',
            marginLeft: '25px'
          }}
        >{`Liczba commitów: ${data.repository.defaultBranchRef.target.history.totalCount}`}</Typography>
        <Typography
          sx={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: '400',
            marginBottom: '25px',
            marginLeft:'25px'
          }}
        >{`Liczba issues: ${data.repository.defaultBranchRef.target.repository.issues.totalCount}`}</Typography>
       
      
     
        
     
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Issues" {...a11yProps(0)} />
          <Tab label="Commits" {...a11yProps(1)} />
          <Tab label="Realeses" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <List>
              
              {data.repository.defaultBranchRef.target.repository.issues.nodes.map(node => (
                <ListItem
                  sx={{
                    
                  }}
                  key={node.id}
                  disableGutters
                >
                  
                    <Typography
                      sx={{

                        fontSize: '10px'
                      }}
                    >
                      {node.title}
                    </Typography>
                  

                </ListItem>
              ))}
             
            </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <List>

              {data.repository.defaultBranchRef.target.history.nodes.map(node => (
                <ListItem
                  sx={{

                  }}
                  key={node.id}
                  disableGutters
                >

                  <Typography
                    sx={{

                      fontSize: '10px'
                    }}
                  >
                    {node.message}
                  </Typography>


                </ListItem>
              ))}

            </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
            <List>

              {data.repository.defaultBranchRef.target.repository.releases.nodes.map(node => (
                <ListItem
                  sx={{

                  }}
                  key={node.id}
                  disableGutters
                >

                  <Typography
                    sx={{

                      fontSize: '10px'
                    }}
                  >
                    {node.name}
                  </Typography>


                </ListItem>
              ))}

            </List>
      </TabPanel>
        </Box>
    </Box>
    )

}

