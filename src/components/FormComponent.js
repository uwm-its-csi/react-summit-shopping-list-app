import { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function FormComponent(props) {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    

    const handleChangeItem = (e) => {
        setItemName(e.target.value);
    }

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleSubmit = (e) => {
        const itemToAdd = {
            id: props.nextId,
            name: itemName,
            quantity: quantity,
            checked: false
        }

        props.handleAddItem(itemToAdd);

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

    return (
        <>
            <form>
                <TextField id="item-name"
                           label='Item Name'
                           onChange={handleChangeItem}
                           value={itemName} />
                &nbsp;
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
                        id="submit"
                        onClick={handleSubmit}>Add To List</Button>
            </form>
        </>
    );
}

export default FormComponent;