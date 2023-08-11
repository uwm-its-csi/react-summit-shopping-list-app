import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [list, setList] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

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

    useEffect(() => {
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
        totalItems,
        setTotalItems
    }

    return (
        <AppContext.Provider value={ appContext }>
            { children }
        </AppContext.Provider>
    )
    
}