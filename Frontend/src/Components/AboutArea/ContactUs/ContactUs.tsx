import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography, useScrollTrigger } from "@mui/material";
import "./ContactUs.css";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

function ContactUs(): JSX.Element {

    return (
        <div className="ContactUs">
            <Typography variant="h3">
                contact us &nbsp;
                <ContactMailIcon />
            </Typography>
            <div className="form-container">

                <form>
                    <TextField label="Name" type="text" className="TextBox" />
                    <TextField label="Email" type="email" className="TextBox" />
                    <TextField label="Message" type="textarea" className="TextBox" />
                    <FormControlLabel control={<Checkbox />} label="Send me discounts" />
                    <ButtonGroup variant="contained">
                        <Button color="primary">Send&nbsp;<SendIcon /></Button>
                        <Button color="secondary">Clear&nbsp;<ClearIcon /></Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
