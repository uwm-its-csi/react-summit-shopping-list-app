import { Typography, Divider } from '@mui/material';
import { AppContext } from '../root/AppContext';
import { useContext } from 'react';

export const TotalComponent = () => {
    const { totalItems } = useContext(AppContext);

    return (
        <>
            <Divider />
            <Typography variant='h4' gutterBottom>Total Items: { totalItems }</Typography>
        </>
    )
}