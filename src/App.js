import { useState } from 'react';
import { Typography, Divider } from '@mui/material';

import './App.css';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';

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

    return (
        <div className='App'>
            <Typography variant='h3' gutterBottom>My Shopping List</Typography>
            <FormComponent handleAddItem={handleAddItem} nextId={nextId} />
            <Divider />
            <ListComponent list={list} handleCheck={handleCheck} handleRemove={handleRemove} />
        </div>
    );
}

export default App;
