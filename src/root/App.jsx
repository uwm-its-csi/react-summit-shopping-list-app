import { Typography, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import './App.css';
import { FormComponent } from '../components/FormComponent';
import ListComponent from '../components/ListComponent';
import { AppContextProvider } from './AppContext';

const defaultTheme = createTheme();

function App() {   

    return (
        <AppContextProvider>
            <div className='App'>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="md">
                        <Typography variant='h3' gutterBottom>My Shopping List</Typography>
                        <FormComponent />
                        <Divider />
                        <ListComponent />
                    </Container>
                </ThemeProvider>
            </div>
        </AppContextProvider>
    );
}

export default App;
