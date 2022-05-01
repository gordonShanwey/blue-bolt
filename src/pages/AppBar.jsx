

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate,Link } from 'react-router-dom'
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(e.target.value);
    
// }
function refreshPage() {
    window.location.reload(false);
}

export default function SearchAppBar() {

    let navigate = useNavigate();
    return (
        <Box sx={{
            flexGrow: 1,
            
        }}>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        marginLeft:'25%',
                        width:'50%',
                        display: 'flex',
                        justifyContent: 'space-between'
                }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link className='link' to='/'>Viewer Repositories</Link>

                        
                    </Typography>
                   
                  
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(ev) => {
                                if (ev.key === "Enter") {
                                    
                                    console.log(ev.target.value);
                                    navigate(`/search/${ev.target.value}`);
                                    refreshPage();
                                }
                            }}
                            
                        />
                        </Search>
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
}
