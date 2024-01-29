import { useContext, useEffect, useState } from 'react';
import { TextField, Button, IconButton, Stack } from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AppContext } from '../root/AppContext';
import { itemListPath } from '../constants';

const filter = createFilterOptions();
const baseApiUrl = process.env.REACT_APP_BASE_API_URL;

export const FormComponent = () => {
    const {
        handleAddItem,
        nextId,
    } = useContext(AppContext);

    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [itemList, setItemList] = useState([]);

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleSubmit = (e) => {
        const itemToAdd = {
            id: nextId,
            name: itemName,
            quantity: quantity,
            checked: false
        }

        handleAddItem(itemToAdd);

        setItemName('');
        setQuantity(1);
    }

    const increment = () => {
        setQuantity((prevQuantity) => {
            return prevQuantity + 1;
        });
    }

    const decrement = () => {
        setQuantity((prevQuantity) => {
            return prevQuantity - 1;
        });
    }
   
    useEffect(() => {
        async function fetchItemList() {
            const response = await fetch(baseApiUrl + itemListPath);
            const list = await response.json();
            console.log(JSON.stringify(list));
            setItemList(list);
        }

        fetchItemList();
    }, []);

    return (
        <Stack direction={{ xs: 'column', md: 'row'}} spacing={{xs: 4}} sx={{mb: 5}}>
            <Autocomplete
                id="item-name"
                label='Item Name'
                onChange={(event, newValue) => {
                    if (typeof newValue.inputValue === 'string') {
                        console.log(`newValue: ${newValue.inputValue}`);
                        setItemName(newValue.inputValue);
                    } else if (newValue && newValue.name) {
                        console.log(`selected existing item: ${newValue.name}`);
                        // Create a new value from the user input
                        setItemName(newValue.name);
                    }
                }}
                value={itemName}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    //Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            name: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={itemList}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Pick an item" />
                )}
            />
            <Stack direction='row'>
                <IconButton id='increment' onClick={increment}>
                    <AddIcon />
                </IconButton>
                <TextField id='quantity'
                        label='Quantity'
                        type="number"
                        min={1}
                        max={99}
                        width={1}
                        value={quantity}
                        onChange={handleChangeQuantity} />
                <IconButton id="decrement" onClick={decrement}>
                    <RemoveIcon />
                </IconButton>
            </Stack>
            <Button variant='contained' onClick={handleSubmit}>Add To List</Button>
        </Stack>
    );
}
