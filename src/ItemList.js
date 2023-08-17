import { useContext } from "react";
import { ItemContext } from './ItemContext';

function ItemList() {

    const { itemList } = useContext(ItemContext);

    return (
        <div style={{   margin: '30px', display: 'flex', justifyContent: 'center' }}>
            <table style={{width: '50%', borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{border: '1px solid white', padding: '20px', background: '#32006e', color: 'white'}}>Item</th>
                        <th style={{border: '1px solid white', padding: '20px', background: '#32006e', color: 'white'}}>Quantity</th>
                    </tr>
                </thead>
                {itemList.length > 0 && itemList.map((item, index) => (    
                    <tbody>
                        <tr style={{ margin: '10px'}} key={index}>
                            <td style={{border: '1px solid black', padding: '20px'}}>{item.item}</td>
                            <td style={{border: '1px solid black', padding: '20px'}}>{item.quantity}</td>
                        </tr>
                    </tbody>
                ))}    
            </table>
        </div>
    );
}

export default ItemList;