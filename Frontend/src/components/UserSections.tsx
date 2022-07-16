import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FileUploadProps, UploadComp } from '../UI/UploadComp';
import NotesTimeline from './NotesTimeline/NotesTimeLine';

const UserSections = () => {
    const fileUploadProp: FileUploadProps = {
        title: 'שיחות פא',
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
    const fileUploaddProp: FileUploadProps = {
        title: 'שיחות חתך',
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
    const fileUploadddProp: FileUploadProps = {
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
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>שיחות פא</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UploadComp {...fileUploadProp} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>שיחות חתך</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UploadComp {...fileUploaddProp} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>חווד מפקדים</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <UploadComp {...fileUploadddProp} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>הערות אישיות</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <NotesTimeline />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default UserSections;
