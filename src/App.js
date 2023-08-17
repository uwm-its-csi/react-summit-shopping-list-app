import './App.css';
import Item from './Item';
import ItemList from './ItemList';
import { ItemProvider } from './ItemContext';

function App() {

    return (
        <div className="App">
            <header style={{ padding: '10px', background: "linear-gradient(95deg,#32006e,#32006e 45%,#76236c)" , color: 'white' }}>
                <h1>Shopping List</h1>
            </header>
            <ItemProvider>
                <div style={{ padding: '20px'}}>
                    <Item />
                    <ItemList />
                </div>
            </ItemProvider>
        </div>
    );
}

export default App;