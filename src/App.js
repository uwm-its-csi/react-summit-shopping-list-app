import { useState, useEffect } from 'react';
import { Typography, Divider } from '@mui/material';
import getStarTrekQuote from 'star-trek-ipsum';

import './App.css';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';

function App() {
    const [list, setList] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [trekQuote, setTrekQuote] = useState('Where no one has gone before!');
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setTrekQuote(getStarTrekQuote());
    }, []);

    useEffect(() => {
        var itemCount = 0;
        list.forEach((item) => {
            itemCount = 
                parseInt(itemCount) + 
                parseInt((item.checked) 
                    ? 0 
                    : item.quantity);
        });

        setTotalItems(itemCount);
    }, [list]);

    const handleAddItem = (itemToAdd) => {
        setList((prevList) => [
            ...prevList, itemToAdd
        ]);

        setNextId((prevMaxId) => prevMaxId + 1);
    }

    /*
    The JavaScript function `handleCheck` is a handler function for checking/unchecking items in a 
    list. It makes use of the map method, which creates a new array resulting from performing a 
    specific function on each item in the original array (in this case, the 'list' array).

    Here's the breakdown:

    - `handleCheck` is a function that takes one argument, `id`. This `id` should correspond to the 
    unique identifier of an item in the list.
    
    - Inside the function, there is a call to `setList`, which is a state-setting function generated 
    by the `useState` hook from React. This function is used to update the state of the list.

    - The argument passed to `setList` is a mapped version of the `list` array. 

    - The map function takes each `item` in the list and checks if its `id` property matches the `id` 
    passed to `handleCheck`.

    - If the `id` matches (`id === item.id`), it returns a new object which is a copy of the 
    original item (`...item` using spread operator) but with the `checked` property toggled 
    (`checked: !item.checked`). In other words, if `checked` was initially `true` (meaning, the item 
        was checked or marked), it will be switched to `false` (unchecked or unmarked), and vice versa.

    - If the `id` does not match, it simply returns the item as is (`...item`).

    - The net effect of this function is that when called with a specific `id`, it will toggle the 
        checked state of the corresponding item in the list.
    */
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
            <div>{ totalItems }</div>
            { trekQuote }
        </div>
    );
}

export default App;
