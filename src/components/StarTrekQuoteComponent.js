import { useState, useEffect } from 'react';
import getStarTrekQuote from 'star-trek-ipsum';

function StarTrekQuote() {
    const [trekQuote, setTrekQuote] = useState('Where no one has gone before!');
    
    useEffect(() => {
        setTrekQuote(getStarTrekQuote());
    }, []);
    
    return (
        <div>{ trekQuote }</div>
    )
};

export default StarTrekQuote;