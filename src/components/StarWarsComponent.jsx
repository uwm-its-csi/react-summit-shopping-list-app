import { Typography } from '@mui/material';
import starwars from 'starwars';

export const StarWarsComponent = () => {

    return (
        <Typography variant='body1' paddingTop={2}>
            {starwars()}
        </Typography>
    )
}