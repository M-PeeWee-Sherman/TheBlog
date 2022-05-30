import React, {  useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
    const editFields = [{label:"Edit",readOnly:true,display:"none"},{label:"Cancel",readOnly:false,display:"block"}]
    const [editState, setEditState] = useState(0);

    let handleInputTitleChange=(e)=>{
        setTitleState(e.target.value);
    }
    let handleInputContentChange=(e)=>{
        setContentState(e.target.value);
    }

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
                    id={`title_${id}`}
                    label="Title"
                    onChange={handleInputTitleChange}
                    value={titleState}
                    sx={{width:'68%'}}
                    InputProps={{
                        readOnly: editFields[editState].readOnly,
                    }}/>
                    <Typography sx={{width:'28%'}}>{stamp}</Typography>        
                </Grid> 
                        
                <TextField 
                    id={`content_${id}`}
                    label="Content" 
                    multiline
                    fillWidth
                    onChange={handleInputContentChange}
                    sx={{...pads, width: '90%'}}
                    variant="outlined"                     
                    value={contentState}
                    InputProps={{
                        readOnly: editFields[editState].readOnly,
                    }}
                    />
                <Grid container direction="row" 
                    justifyContent="center"
                    alignItems="center"> 
                    <Button>Expand</Button>
                    <Button id={`EditButton_${id}`} 
                        onClick={(e)=>{
                        e.preventDefault();
                        
                        if(editState===0){
                            setEditState(1)
                        }else{
                            setContentState(content);
                            setTitleState(title);
                            setEditState(0);
                        }
                    }}>{editFields[editState].label}</Button>
                    <Box id={`SubmitBox_${id}`} component="span" display={editFields[editState].display}>
                        <Button 
                            id={`submitUpdateButton_${id}`} 
                            onClick={(e)=>{
                                e.preventDefault();
                                updateFn({id, users_id, content:contentState, title:titleState});
                            }}
                            >Submit</Button></Box>
                    <Button
                            onClick={(e)=>{
                                e.preventDefault();
                                deleteFn(id);
                            }}
                    >Delete</Button> 
                </Grid>
            </Grid>)
}

export default Post;