import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { muiTheme } from './CreateTheme';
import logo from '../src/assets/uw-medicine-logo.svg';
import './App.css';

/**
 * AppBarHeader.js - this component displays the header used by the application.
 *
 * @author Tom Soluri
 * @version 1.0
 * @since 2023-08-01
 */
export default function AppBarHeader() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: muiTheme.palette.primary.mainGradient}}>
                <Toolbar>
                    <a href={'/'}
                        data-wpel-link="internal" rel="nofollow noopener noreferrer">
                        <img alt="logo" style={{width: 170}} src={logo}/>
                    </a>
                    <Typography align='center' variant="h4" component="div" sx={{flexGrow: 1}}>
                        Shopping List
                    </Typography>
                    <div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}