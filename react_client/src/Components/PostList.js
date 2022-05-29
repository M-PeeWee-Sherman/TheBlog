import Post from './Post'
import Stack from '@mui/material/Stack';

const PostList=({updateFn,deleteFn,entryList})=> {
    let compiledPosts = entryList.map((element)=>(
        <Post updateFn={updateFn} deleteFn={deleteFn} entry={element}/>
        ))
    return (<Stack 
                direction="column" 
                spacing={1}
                alignItems="center"
                justifyContent="center"
                margin={2}>
                { compiledPosts }
            </Stack>)
}

export default PostList;
