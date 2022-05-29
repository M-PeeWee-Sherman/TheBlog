import React, {  useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const pads = {
    gap :2,
    margin: 2
}

const outerGrid = {
   
    border: 1,
    borderRadius: 2,
    maxWidth: 600,
    
  }

const Post=({updateFn,deleteFn,entry})=> {
    const {id, users_id, stamp, title, content}=entry;
    const [titleState, setTitleState] = useState(title);
    const [contentState, setContentState] = useState(content);


    return (<Grid
            container
            sx={{...pads,...outerGrid,}}
            direction="column"
            justifyContent="center"
            alignItems="center"
            variant="outlined" >
                <Grid container 
                sx={pads}
                direction="row" 
                justifyContent="center"
                alignItems="center"
                > 
                    <TextField
                    id="title"
                    label="Title"
                    defaultValue={titleState}
                    sx={{width:'68%'}}
                    InputProps={{
                        readOnly: true,
                    }}/>
                    <Typography sx={{width:'28%'}}>{stamp}</Typography>        
                </Grid> 
                        
                <TextField 
                    id="content" 
                    label="Content" 
                    multiline
                    fillWidth
                    sx={{...pads, width: '90%'}}
                    variant="outlined"                     
                    defaultValue={contentState}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                <Grid container direction="row" 
                    justifyContent="center"
                    alignItems="center"> 
                    <Button>Expand</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button> 
                </Grid>
            </Grid>)
}

export default Post;