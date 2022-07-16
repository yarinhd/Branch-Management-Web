import { Box, Button, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { FileUploadProps, UploadComp } from '../UI/UploadComp';
// import { FileUpload, FileUploadProps } from '../components/uploadFile/fileUpload';

// component for registering user at first login to the system

const useStyles = makeStyles(() => ({
    box: {
        display: 'flex',
        // padding: '0 96px',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        letterSpacing: 0,
        color: '#3E3E3E',
        marginBottom: 24,
    },
}));

const Havad: React.FC = () => {
    const fileUploadProp: FileUploadProps = {
        title: 'חווד מפקדים',
        accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files !== null && event.target?.files?.length > 0) {
                console.log(`Saving ${event.target.value}`);
                console.log(`Saving ${event.target.files.length}`);
                console.log(`Saving ${event.target.files[0]}`);
            }
        },
        onDrop: (event: React.DragEvent<HTMLElement>) => {
            console.log(`Drop ${event.dataTransfer.files[0].name}`);
            console.log(`Drop ${event.dataTransfer.files[0].size}`);
            console.log(`Drop ${event.dataTransfer.files[0].type}`);
        },
    };
    return (
        <Box className="box">
            {/* <FileUpload {...fileUploadProp} imageButton/> */}
            {/* <FileUpload {...fileUploadProp} /> */}
            <UploadComp {...fileUploadProp} />
        </Box>
    );
    // const classes = useStyles();
    // return (
    //     <label htmlFor="raised-button-file">
    //         <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" multiple type="file" />
    //         <Button variant="contained" component="span">
    //             Upload
    //         </Button>
    //     </label>
    // );
};

export default Havad;
