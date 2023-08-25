import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, IconButton, TextField } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const ShoppingList = () => {
    const [language, setLanguage] = useState('en');   // 'en' for English, 'zh' for Chinese
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    // const [pickedUp, setPickedUp] = useState(false);

    // Load shopping list from localStorage on initial render
    useEffect(() => {
          if (typeof window !== 'undefined') {
            console.log('we are running on the client');
          } else {
            console.log('we are running on the server');
            const savedItems = localStorage.getItem('shoppingList');
            if (savedItems) {
                setItems(JSON.parse(savedItems));
            }
        }
    }, []);

    // Save shopping list to localStorage whenever the 'items' state changes
    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(items))
    }, [items]);

    const handleAddItem = () => {
        if (itemName.trim !== '' && quantity.trim() !== "") {
            setItems([...items, { name: itemName, quantity: quantity, pickedUp: false }]);
            setItemName('');
            setQuantity('');
            // setPickedUp(false);
        }
    };

    const handleDeleteItem = (index) => {
        // const newItems = [...items];
        // newItems[index] = !newItems[index];
        // setItems(newItems);
        setItems((prevItems) => {
            return prevItems.filter((_, i) => i !== index)
        });
    };

    const handleTogglePickup = (e) => {
        // const newItems = [...items];
        // newItems[index].pikedUp = !newItems[index].pickedUp;
        // setItems(newItems);
        // const id = e.target.id;
        const id = Number.parseInt(e.target.id);
        const updatedItems = items.map((item, index) => id === index ? {...item, pickedUp: !item.pickedUp} : {...item});
        setItems(updatedItems);
    };

    return (
      <div>
        <h1>{language === 'en' ? 'Shopping List' : '购物清单'}</h1>
        <div>
          <TextField
            label={language === 'en' ? 'Item name' : '商品名称'}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label={language === 'en' ? 'Quantity' : '数量'}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddItem}>
            {language === 'en' ? 'Add Item' : '添加商品'}
          </Button>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <FormControlLabel
                control={
                  <Checkbox id={index.toString()}
                    checked={item.pickedUp}
                    onChange={handleTogglePickup}
                    color="primary"
                  />
                }
                label={item.name + ' x ' + item.quantity}
              />

              <IconButton onClick={() => handleDeleteItem(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
        <div>
          <Button onClick={() => setLanguage('en')}>English</Button>
          <Button onClick={() => setLanguage('zh')}>中文</Button>
        </div>
      </div>
    );
};

export default ShoppingList;