import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const PicOfTheDayComponent = () => {
    const [imageObj, setImageObj] = useState({});

    const nasaAPODApiUrl = 'https://api.nasa.gov/planetary/apod';
    const queryKey = '?api_key='
    const nasaApiKey = 'j1JMggJOYXZjh4cpq8ZDThOmvxi2VNZ1gwVTaA4o';

    async function fetchImgInfo() {
        await fetch(nasaAPODApiUrl + queryKey + nasaApiKey)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setImageObj(data);
                }
            })
            .catch((e) => {
                console.error(e.statusMessage);
            });
    }
    

    useEffect(() => {
        console.log('in useEffect')
        fetchImgInfo();
    }, []);

    return (
        <>
            <img src={imageObj.url}
                 alt={imageObj.title}
                 title={imageObj.title}
                 width={400} />
            <Typography variant='body2' paddingTop={2}>
                {imageObj.explanation}
            </Typography>
        </>
    )
}