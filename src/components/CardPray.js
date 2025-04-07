import * as React from 'react';
import logo from '../logo.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function CardPray({name,time,image}) {
    return (
        <Card  sx={{ width: "13vw" }}>
            <CardActionArea>
                <CardMedia component="img"
                    height="160"
                    image={image}
                    />

                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography variant="h2" sx={{ color: 'text.secondary',marginBottom:"20px" }}>
                    {time}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
