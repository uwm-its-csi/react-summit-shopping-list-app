import { Typography, Divider } from '@mui/material';

import './App.css';
import { FormComponent } from '../components/FormComponent';
import ListComponent from '../components/ListComponent';
import { StarWarsComponent } from '../components/StarWarsComponent';
import { PicOfTheDayComponent } from '../components/PicOfTheDayComponent';
import { AppContextProvider } from './AppContext';

function App() {   

    return (
        <AppContextProvider>
            <div className='App'>
                <Typography variant='h3' gutterBottom>My Shopping List</Typography>
                <FormComponent />
                <Divider />
                <ListComponent />
                <Divider />
                <StarWarsComponent />
                <Divider />
                <PicOfTheDayComponent />
            </div>
        </AppContextProvider>
    );
}

export default App;
