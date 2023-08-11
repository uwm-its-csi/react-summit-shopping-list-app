import { useEffect, useState } from 'react';
import { Typography, Divider } from '@mui/material';

import './App.css';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';
import { StarWarsComponent } from './components/StarWarsComponent';
import { PicOfTheDayComponent } from './components/PicOfTheDayComponent';

function App() {
    const [list, setList] = useState([]);
    const [nextId, setNextId] = useState(0);

    const handleAddItem = (itemToAdd) => {
        setList((prevList) => [
            ...prevList, itemToAdd
        ]);

        setNextId((prevMaxId) => prevMaxId + 1);
    }

    const handleCheck = (id) => {
        setList(
          list.map((item) => id === item.id
            ? {...item, checked: !item.checked}
            : {...item})
        );
    }
  
    const handleRemove = (index) => {
        setList((prevList) => {
            return prevList.filter((_, i) => i !== index)
        });
    }

    useEffect(() => {
        console.log(`Next item id: ${nextId}`);
    }, [nextId]);

    return (
        <div className='App'>
            <Typography variant='h3' gutterBottom>My Shopping List</Typography>
            <FormComponent handleAddItem={handleAddItem} nextId={nextId} />
            <Divider />
            <ListComponent list={list} handleCheck={handleCheck} handleRemove={handleRemove} />
            <Divider />
            <StarWarsComponent />
            <Divider />
            <PicOfTheDayComponent />
        </div>
    );
}

export default App;
