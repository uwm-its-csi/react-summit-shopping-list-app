import { createContext, useEffect, useState } from 'react';
import { randomId } from '@mui/x-data-grid-generator';
// Define the Context
const ItemContext = createContext(null)

/**
 * ItemContext.js - this component handles the context, which contains the state variables
 * for the items selected.  This context will be used by all of the child components.
 * 
 * @author Tom Soluri
 * @version 1.0
 * @since 2023-08-01
 */
function ItemProvider({ children }) {

    const [itemList, setItemList ] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (itemList.length > 0) {
            const message = `You have entered ${itemList.length} item(s) in your shopping list`;
            setMessage(message);
        }
    },[itemList]);

    const handleAdd =(formValues)=> {
      const item = formValues.item;
      const quantity = formValues.quantity;
      const addItem = {id: randomId(), item: item, quantity: quantity};
      const items = [...itemList, addItem];
      setItemList(items);
    };
    
    return (
        <ItemContext.Provider value={{ itemList, handleAdd, message }}>
            {children}
        </ItemContext.Provider>
      );
}

export { ItemContext, ItemProvider };