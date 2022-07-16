import { makeStyles } from '@material-ui/core';
import { Divider } from '@mui/material';
import React from 'react';
import './flipCard.css';

const useStyles = makeStyles(() => ({
    flip_card: {
        backgroundColor: 'transparent',
        width: '300px',
        height: '200px',
        border: '1px solid #f1f1f1',
        perspective: '1000px',
        '&:hover': { transform: 'rotateY(180deg)' },
    },
    flip_card_back: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '5%',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        background: 'linear-gradient(#91A6FF, #FFFFFF)',
        color: 'black',
        transform: 'rotateY(180deg)',
    },
    flip_card_front: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '5%',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        background: 'linear-gradient(#37D5D6, #36096D)',
        color: 'white',
    },
    flip_card_inner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        transition: 'transform 0.8s',
        transformStyle: 'preserve-3d',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'rotateY(180deg)',
    },
    cardText: {
        fontSize: '20px',
    },
    // flip_card_front: { background: 'linear-gradient(#37D5D6, #36096D)', color: 'white' },
    // flip_card_back: { background: 'linear-gradient(#91A6FF, #FFFFFF)', color: 'black', transform: 'rotateY(180deg)' },
}));

const FlipCardItem: React.FC<{ boxData: any } & React.HTMLAttributes<any>> = (props) => {
    const { boxData } = props;
    // console.log(boxData);
    const classes = useStyles();
    const title = Object.keys(boxData)[0];
    const content = boxData[title];
    // console.log(boxData[title]);
    return (
        <li className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h1 className={classes.cardText}>
                        {title}
                        <Divider variant="middle" />
                        {content}
                    </h1>
                </div>
                <div className="flip-card-back">
                    <h1 className={classes.cardText}>
                        {title}
                        <Divider variant="middle" />
                        {content}
                    </h1>
                </div>
            </div>
        </li>
        // <div className={classes.flip_card}>
        //     <div className={classes.flip_card_inner}>
        //         <div className={classes.flip_card_front}>
        //             <h1>
        //                 {title}
        //                 <Divider variant="middle" />
        //                 {content}
        //             </h1>
        //         </div>
        //         <div className={classes.flip_card_back}>
        //             <h1>
        //                 {title}
        //                 <Divider variant="middle" />
        //                 {content}
        //             </h1>
        //         </div>
        //     </div>
        // </div>
    );
};

export default FlipCardItem;
