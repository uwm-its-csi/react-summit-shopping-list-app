import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import './App.css';
import AppBarHeader from './AppBarHeader';
import Footer from './Footer';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import { ItemProvider } from './ItemContext';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

function App() {

    return (
        <div className="page-container">
            <div className="content-wrap">
                <AppBarHeader />
                <ItemProvider>
                    <Grid container alignItems="center" justify='center' spacing={2}>
                        <Grid item xs={4}>
                            <Item>
                                <ItemForm />
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>
                                <ItemList />
                            </Item>
                        </Grid>
                    </Grid>
                </ItemProvider>
            </div>
            <Footer /> 
        </div>
    );
}

export default App;