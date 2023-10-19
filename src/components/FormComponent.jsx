import { useContext, useEffect, useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AppContext } from '../root/AppContext';
import { itemListUrl } from '../constants';

const filter = createFilterOptions();

export const FormComponent = () => {
    const {
        handleAddItem,
        nextId
    } = useContext(AppContext);

    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [itemList, setItemList] = useState([]);

    const handleChangeItem = (e, newValue) => {
        if (typeof newValue === 'string') {
            setItemName(newValue);
        } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setItemName(newValue.inputValue);
        } else {
            setItemName(newValue);
        }
    }

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
            const response = await fetch(itemListUrl);
            const list = await response.json();
            console.log(JSON.stringify(list));
            setItemList(list);
        }

        fetchItemList();
    }, []);

    return (
        <>
            <form>
                <Autocomplete
                    id="item-name"
                    label='Item Name'
                    onChange={(event, newValue) => {
                        console.log(`newValue: ${newValue}`);
                        if (typeof newValue === 'string') {
                            setItemName(newValue);
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setItemName(newValue.inputValue);
                        } else {
                            setItemName(newValue);
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
                <IconButton id="increment"
                            onClick={increment}>
                    <AddIcon />
                </IconButton>
                <TextField id="quantity"
                           label='Quantity'
                           type="number"
                           min={1}
                           max={99}
                           width={1}
                           value={quantity}
                           onChange={handleChangeQuantity} />
                <IconButton id="decrement"
                            onClick={decrement}>
                    <RemoveIcon />
                </IconButton>
                &nbsp;
                <Button variant='contained'
                        onClick={handleSubmit}>Add To List</Button>
            </form>
        </>
    );
}

/* const itemList = [
    {
        "name": "Milk"
    },
    {
        "name": "Bread"
    },
    {
        "name": "Dog Food"
    },
    {
        "name": "Cat Food"
    },
    {
        "name": "Coffee"
    },
    {
        "name": "Tea"
    },
    {
        "name": "Fish"
    },
    {
        "name": "Broccoli"
    },
    {
        "name": "Bananas"
    },
    {
        "name": "Apples"
    },
    {
        "name": "Crackers"
    },
    {
        "name": "Cookies"
    },
    {
        "name": "Eggs"
    },
    {
        "name": "Cheese"
    }
]; */