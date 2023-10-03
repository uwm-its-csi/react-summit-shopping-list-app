import { createContext, useEffect, useState } from "react";
import { shoppingListUrl } from '../constants';

export const AppContext = createContext(null);
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [list, setList] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const userid = 'rbeerma';

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
        console.log(`Removing item with index: ${index}`);

        setList((prevList) => {
            return prevList.filter((_, i) => i !== index)
        });
    }

    const handleSaveList = () => {
        const url = shoppingListUrl;

        const body = {
            userID: userid,
            list: list
        }

        fetch (url, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    } 

    useEffect(() => {
        const url = shoppingListUrl + '?userid=' + userid;

        async function fetchShoppingList() {
            const response = await fetch(url);
            const shoppingList = await response.json();
            console.log(JSON.stringify(shoppingList));
            setList(shoppingList);
            setNextId(shoppingList.length);
        }

        fetchShoppingList();
    }, []);

    useEffect(() => {
        console.log(`Next item id: ${nextId}`);
    }, [nextId]);

    useEffect(() => {
        // Use reducer to get total items
        const initVal = 0;
        const total = list.reduce((acc, currItem) => acc + Number.parseInt(currItem.quantity), initVal);
        console.log(`Total items: ${total}`);
        setTotalItems(total);
    }, [list]);

    const appContext = {
        list,
        setList,
        nextId,
        setNextId,
        handleAddItem,
        handleCheck,
        handleRemove,
        handleSaveList,
        totalItems,
        setTotalItems
    }

    return (
        <AppContext.Provider value={ appContext }>
            { children }
        </AppContext.Provider>
    )
}