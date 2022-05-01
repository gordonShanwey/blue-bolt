
import {Search} from './pages/Search.jsx'
import  Viewer  from './pages/Viewer'
import { Repo } from './pages/Repo'
import AppBar from './pages/AppBar';
import ErrorPage from './pages/ErrorPage.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';





function App() {
  return (
    <Router>
      <div className="App">
        <Box
          sx={{
            display: 'flex',
            flexDirection:'column',
            
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.dark',
            
          }}
        >
      <AppBar />
     
      
      <Routes>
        <Route path='/'  element={<Viewer />}   />
        <Route path='/repo/:owner/:name'  element={<Repo />}   />
        <Route path='/search/:query'  element={<Search/>}   />
        <Route path='*'  element={<ErrorPage />}   />

      </Routes>
        </Box>
      </div>
    </Router>
      );
}

export default App;
