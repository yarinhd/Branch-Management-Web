import React, { useContext, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, Grid, Icon, makeStyles } from '@material-ui/core';
import { FileIcon, defaultStyles } from 'react-file-icon';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import FileUploadDefaultImage from './FileUploadDefaultImage.png';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { uploadFile } from '../services/user';
import useWrapFetch from '../hooks/useWrapFetch';
import { Context } from '../store/Store';

const FileUploadDefaultImage =
    'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8zMDg0MzllMTI3MDFlZjg1MjQ1ZGMwNjMyZGQwN2MyYT9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.1arslmyBRJPth7k4rS8_8nIKHm-wX5RBNgWK7Rvyg0g';

export type FileUploadProps = {
    title: string;
    accept: string;
    imageButton?: boolean;
    hoverLabel?: string;
    dropLabel?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    image?: {
        url: string;
        imageStyle?: {
            width?: string;
            height?: string;
        };
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

const useStyle = makeStyles({
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        '&:hover p,&:hover svg,& img': {
            opacity: 1,
        },
        '& p, svg': {
            opacity: 0.4,
        },
        '&:hover img': {
            opacity: 0.1,
        },
    },
    noMouseEvent: {
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
    },
    hidden: {
        display: 'none',
    },
    onDragOver: {
        '& img': {
            opacity: 0.3,
        },
        '& p, svg': {
            opacity: 1,
        },
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        margin: '0px',
        border: '1px solid',
        borderRadius: '10px',
        width: '100%',
        // height: '100%',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    uploadWrapper: {
        display: 'flex',
        flexDirection: 'row',
        margin: '0px',
        border: '1px solid',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    fileContainer: {
        height: '100px',
        margin: '20px',
        width: '50px',
        // height: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    allBox: {
        maring: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    generalCard: {
        marginTop: '1%',
        width: '100%',
        height: '85vh',
    },
});

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});
export const UploadComp: React.FC<FileUploadProps> = ({
    title,
    accept,
    imageButton = false,
    hoverLabel = 'Click or drag to upload file',
    dropLabel = 'Drop file here',
    width = '600px',
    height = '500px',
    backgroundColor = '#fff',
    image: {
        url = FileUploadDefaultImage,
        imageStyle = {
            height: 'inherit',
        },
    } = {},
    onChange,
    onDrop,
}) => {
    const classes = useStyle();
    const [state, dispatch] = useContext(Context);
    const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);
    const [imageUrl, setImageUrl] = React.useState(url);
    const [labelText, setLabelText] = React.useState<string>(hoverLabel);
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
    const stopDefaults = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const dragEvents = {
        onMouseEnter: () => {
            setIsMouseOver(true);
        },
        onMouseLeave: () => {
            setIsMouseOver(false);
        },
        onDragEnter: (e: React.DragEvent) => {
            stopDefaults(e);
            setIsDragOver(true);
            setLabelText(dropLabel);
        },
        onDragLeave: (e: React.DragEvent) => {
            stopDefaults(e);
            setIsDragOver(false);
            setLabelText(hoverLabel);
        },
        onDragOver: stopDefaults,
        onDrop: (e: React.DragEvent<HTMLElement>) => {
            stopDefaults(e);
            setLabelText(hoverLabel);
            setIsDragOver(false);
            if (imageButton && e.dataTransfer.files[0]) {
                setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
            }
            // Ask Almog: why is that here?
            onDrop(e);
        },
    };
    // TODO: continue from here! add to uploadfile func

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (imageButton && event.target.files![0]) {
            console.log(1, event.target.files![0]);
            setImageUrl(URL.createObjectURL(event.target.files![0]));
        }
        setFileToUpload(event.target.files![0]);

        onChange(event);
    };
    const uploadFileWrapped = useWrapFetch(uploadFile.bind(null, state.user?._id as string, fileToUpload as File))();

    console.log('file wrapped:', uploadFileWrapped);

    useEffect(() => {
        console.log('sssss', fileToUpload);

        if (fileToUpload !== null) {
            console.log('fileee', fileToUpload);
        }
    }, [fileToUpload]);

    const fileUploadHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        uploadFileWrapped((document) => {
            console.log('hi effect');
            console.log('response', document);
        });
    };

    const yara = 'File';
    return (
        <ThemeProvider theme={theme}>
            {/* <Grid item xs={12}> */}
            <Card raised className={classes.generalCard}>
                <CardHeader
                    style={{
                        textAlign: 'right',
                        background: 'linear-gradient(to right, #13E2DA, #737DFE)',
                        color: '#fff',
                        height: '4%',
                        opacity: 1,
                    }}
                    title={<Typography variant="h6">{title}</Typography>}
                />

                <CardContent style={{ paddingBottom: '0.05%', height: '60%' }}>
                    <Box className={classes.iconWrapper}>
                        <div className={classes.fileContainer}>
                            <FileIcon
                                fold
                                labelColor="black"
                                gradientOpacity={0.5}
                                extension="docx"
                                {...defaultStyles.docx}
                            />
                            {yara}
                        </div>
                        <div className={classes.fileContainer}>
                            <FileIcon fold extension="pdf" {...defaultStyles.pdf} />
                            {yara}
                        </div>
                        <div className={classes.fileContainer}>
                            <FileIcon fold extension="docx" {...defaultStyles.docx} />
                            {yara}
                        </div>
                        <div className={classes.fileContainer}>
                            <FileIcon fold extension="docx" {...defaultStyles.docx} />
                            {yara}
                        </div>
                        <div className={classes.fileContainer}>
                            <FileIcon fold extension="docx" {...defaultStyles.docx} />
                            {yara}
                        </div>
                        <div className={classes.fileContainer}>
                            <FileIcon
                                fold
                                labelColor="black"
                                gradientOpacity={0.5}
                                extension="docx"
                                {...defaultStyles.docx}
                            />
                            {yara}
                        </div>
                        <div className={classes.fileContainer}>
                            <FileIcon fold extension="pdf" {...defaultStyles.pdf} />
                            {yara}
                        </div>
                    </Box>
                </CardContent>

                <CardActions style={{ padding: '16px', height: '20%' }}>
                    <Box className={classes.uploadWrapper}>
                        <input
                            onChange={handleChange}
                            accept={accept}
                            className={classes.hidden}
                            id="file-upload"
                            type="file"
                        />
                        <label
                            htmlFor="file-upload"
                            {...dragEvents}
                            className={clsx(classes.root, isDragOver && classes.onDragOver)}
                        >
                            <button type="button" onClick={fileUploadHandler}>
                                Upload
                            </button>
                            <Box
                                width={width}
                                height={height}
                                bgcolor={backgroundColor}
                                className={classes.noMouseEvent}
                            >
                                {imageButton && (
                                    <Box position="absolute" height={height} width={width}>
                                        <img alt="file upload" src={imageUrl} style={imageStyle} />
                                    </Box>
                                )}

                                {(!imageButton || isDragOver || isMouseOver) && (
                                    <Box height={height} width={width} className={classes.iconText}>
                                        <CloudUploadIcon fontSize="large" />
                                        <Typography>{labelText}</Typography>
                                    </Box>
                                )}
                            </Box>
                        </label>
                    </Box>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
};

UploadComp.defaultProps = {
    // title: 'Generic Title',
    imageButton: false,
    hoverLabel: 'Click or drag to upload file',
    dropLabel: 'Drop file here',
    width: '600px',
    height: '100px',
    backgroundColor: '#fff',
    image: {
        url: FileUploadDefaultImage,
        imageStyle: {
            width: 'inherit',
            height: 'inherit',
        },
    },
};
