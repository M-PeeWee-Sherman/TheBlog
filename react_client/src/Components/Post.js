import React, { useContext, useState } from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Post = ({showFullFn,updateFn,deleteFn,entry}) => {
    return (
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
            <PostHeader title={entry.title} stamp={entry.stamp}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <PostButtons show={showFullFn} update={updateFn} delete={deleteFn}>    
            </Grid>
    )
}
export default Post;