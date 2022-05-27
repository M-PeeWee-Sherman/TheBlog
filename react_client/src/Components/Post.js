import React, { useContext, useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';



const outerGrid = {
    gap :2,
    border: 1
  }

const Post=({showFullFn,updateFn,deleteFn,entry})=> {
    const {id, users_id, stamp, title, content}=entry;
    //const [fullPosts, setFullPosts] = useState(posts);


    return (<Grid
            container
            sx={outerGrid}
            direction="column"
            justifyContent="center"
            alignItems="center"
            variant="outlined" >
                <Grid container direction="row" 
                justifyContent="center"
                alignItems="center"> 
                    <TextField
                    id="title"
                    label="Title"
                    defaultValue={title}
                    InputProps={{
                        readOnly: true,
                    }}/>
                    <Typography>{stamp}</Typography>        
                </Grid> 
                        
                <TextField 
                    id="content" 
                    label="Content" 
                    variant="outlined"                     
                    defaultValue={content}
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